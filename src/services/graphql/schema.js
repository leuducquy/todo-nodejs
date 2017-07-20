const typeDefinitions = `
type Todo {
  id: String
  text: String
  complete: Boolean
  ownerId : String
}
type Taco {
  id: String
  meat: String
  cheese: String
  salsa: String
}
type User {
  id: String! 
  email: String!
  secretBurritos: [SecretBurrito]
  todos : [Todo]
}
type SecretBurrito {
  id: String
  size: String
}
type Authorized {
  token: String 
  data: User
}
type RootQuery {
   viewer(token: String!): User
}
type Subscription {
  todoAdded: Todo
}
type RootMutation {
  createTodo (
    text: String!
    complete : Boolean
    token : String!
  ): Todo
  createTaco (
    meat: String!
    cheese: String
    salsa: String
  ): Taco
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
