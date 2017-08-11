import feathers from 'feathers-client';
import superagent from 'superagent';
import { pubsub } from './index';
export default function Resolvers() {
  let app = this;
  const Todos = app.service('todos');
  const TodoList = app.service('todoList');
  const Users = app.service('users');
  const SecretBurritos = app.service('secretBurritos');
  const Viewer = app.service('viewer');

  const base = `http://${app.get('host')}:${app.get('port')}`;
  const Auth = feathers()
    .configure(feathers.rest(base).superagent(superagent))
    .configure(feathers.hooks())
    .configure(feathers.authentication());


  return {
    TodoList: {
      todos(todoList, args, context) {
        console.log('get todoList ser ', context);
        return Todos.find({
          query: {
            listId: todoList.id
          }
        });
      }
    },
    User: {
      todoList(user, args, context) {
        return TodoList.find({
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
      createTodoList(root, { name, token }, context) {
        return TodoList.create(
          { name },
          {
            provider: context.provider,
            token
          }
        );
      },
      createTodo(root, { listId, text, complete, token }, context) {
        return Todos.create(
          { text, complete, listId },
          {
            provider: context.provider,
            token
          }
        ).then(todo => {
          pubsub.publish('todoChanges', {
            op: 'created',
            todo
          });
          return todo;
        }).catch(err => {
          console.log(err);
        });
      },
      deleteTodo(root, { id, token }, context) {
        return Todos.remove(id, {
          provider: context.provider,
          token,
        })
          .then(todo => {
            pubsub.publish('todoChanges', {
              op: 'deleted',
              todo,
            });
          });
      },
      updateTodo(root,
        { id, text, complete, token },
        context) {
        return Todos.update(id, {
          text,
          complete,
        }, {
            provider: context.provider,
            token,
          })
          .then(todo => {
            pubsub.publish('todoChanges', {
              op: 'updated',
              todo,
            });
          });
      },
      signUp(root, args, context) {
        return Users.create(args).then(data => {
        });
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
      todoChanges(todo) {
        return todo;
      }
    }
  };
}
