'use strict';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema';
import { execute, subscribe } from 'graphql';
import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
const hooks = require('./hooks');
export  const pubsub = new PubSub();

module.exports = function () {

  const subscriptionManager = new SubscriptionManager({
    schema: Schema,
    pubsub
  })
  const WS_PORT = 5000;

  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  app.use('/graphql', graphqlExpress((req) => {
    const {  provider } = req.feathers;
    return {
      schema: executableSchema,
      context: {
        provider
      }
    };
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  // Bind it to port and start listening
  websocketServer.listen(WS_PORT, () => console.log(
    `Websocket Server is now running on http://localhost:${WS_PORT}`
  ));

  const subscriptionServer = new SubscriptionServer(
    {
      
      subscriptionManager,

    },
    {
      server: websocketServer,
      path: '/graphql',
    },
  );
};
