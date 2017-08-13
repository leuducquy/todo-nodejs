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
type TodoListCrud {
  op : String!
  todoList: TodoList!
}
type User {
  id: String! 
  email: String!
  todoList : [TodoList]
}
type TodoList {
  id: String 
  name: String!
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
  todoListChanges: TodoListCrud!
}
type RootMutation {
  createTodo (
    text: String!
    complete : Boolean
    listId:String!
    token : String!
  ): Todo
  createTodoList (
    name: String!
    token : String!
  ):TodoList
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
