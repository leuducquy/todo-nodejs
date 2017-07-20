import feathers from 'feathers-client';
import superagent from 'superagent';
import { pubsub } from './index';
export default function Resolvers() {
  let app = this;

  const Tacos = app.service('tacos');
  const Todos = app.service('todos');
  const Users = app.service('users');
  const SecretBurritos = app.service('secretBurritos');
  const Viewer = app.service('viewer');

  const base = `http://${app.get('host')}:${app.get('port')}`;
  const Auth = feathers()
    .configure(feathers.rest(base).superagent(superagent))
    .configure(feathers.hooks())
    .configure(feathers.authentication());

  return {
    User: {
      secretBurritos(user, args, context) {
        return SecretBurritos.find({
          query: {
            ownerId: user.id
          }
        });
      },
      todos(user, args, context) {
        return Todos.find({
          query: {
            ownerId: user.id
          }
        });
      }
    },
    RootQuery: {
      viewer(root, { token }, context) {
        return Viewer.find({
          provider: context.provider,
          token,
        });
      }
    },
    RootMutation: {
      createTaco(root, data, context) {
        console.log(Tacos);
        return Tacos.create(data, context);
      },
      createTodo(root, { text, complete, token }, context) {
        return Todos.create(
          { text, complete },
          {
            provider: context.provider,
            token
          }
        ).then(todo => {
          pubsub.publish('todoAdded', todo);
        }).catch(err => {
          console.log(err);
        });
      },
      signUp(root, args, context) {
        console.log(args);
        return Users.create(args);
      },
      login(root, { email, password }, context) {
        return Auth.authenticate({
          type: 'local',
          email,
          password
        });
      },

    },
    Subscription: {
      todoAdded(todo) {
        console.log(todo);
        return todo;
      }
    }
  };
}
