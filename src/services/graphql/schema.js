const typeDefinitions = `
type Todo {
  id: String
  text: String
  complete: Boolean
  ownerId : String
}
type TodoCrud {
  op : String!
  todo: Todo!
}
type User {
  id: String! 
  email: String!
  todos : [Todo]
}

type Authorized {
  token: String 
  data: User
}
type RootQuery {
   viewer(token: String!): User
}

type Subscription {
  todoChanges: TodoCrud!
}
type RootMutation {
  createTodo (
    text: String!
    complete : Boolean
    token : String!
  ): Todo
  deleteTodo (
    id : String!
    token : String!
  ) :Todo
   updateTodo (
    id : String!
    text : String!
    complete : Boolean!
    token : String!
  ) :Todo
  signUp (
    email: String!
    password: String!
  ): User
  login (
    email: String!
    password: String!
  ): Authorized
}
schema {
  query: RootQuery
  mutation: RootMutation
  subscription : Subscription
}
`;

export default typeDefinitions;
