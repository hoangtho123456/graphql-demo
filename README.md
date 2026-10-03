# GraphQL Demo

A small GraphQL API built with [Apollo Server](https://www.apollographql.com/docs/apollo-server/). It exposes two resources, books and users, with queries and mutations for each.

Data is stored in memory, so every change is lost when the server restarts.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

The server starts at http://localhost:4000. Open that URL in a browser to use Apollo Sandbox, where you can write and run the operations below.

## Project structure

```
server.js              Creates the Apollo Server and merges all modules
src/
  books/
    schema.js          Book type, queries and mutations
    resolvers.js       Logic for each book query and mutation
    mockdata.js        Initial list of books
  users/
    schema.js          User type, queries and mutations
    resolvers.js       Logic for each user query and mutation
    mockdata.js        Initial list of users
```

## Books

A book has `id`, `title` and `author`.

### Get all books

```graphql
query {
  books {
    id
    title
    author
  }
}
```

### Get one book

Returns `null` if no book has that id.

```graphql
query {
  book(id: "1") {
    id
    title
    author
  }
}
```

### Add a book

`title` and `author` are both required. Adding a title that already exists returns an error.

```graphql
mutation {
  addBook(title: "Clean Code", author: "Robert C. Martin") {
    id
    title
    author
  }
}
```

### Update a book

Only `id` is required. Fields you leave out keep their current value. Returns `null` if no book has that id.

```graphql
mutation {
  updateBook(id: "1", title: "Nineteen Eighty-Four") {
    id
    title
    author
  }
}
```

### Delete a book

Returns `true` if the book was deleted and `false` if no book has that id.

```graphql
mutation {
  deleteBook(id: "1")
}
```

## Users

A user has `id`, `name` and `email`.

### Get all users

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Get one user

Returns `null` if no user has that id.

```graphql
query {
  user(id: "1") {
    id
    name
    email
  }
}
```

### Add a user

`name` and `email` are both required. Adding an email that already exists returns an error.

```graphql
mutation {
  addUser(name: "Frank", email: "frank@example.com") {
    id
    name
    email
  }
}
```

### Update a user

Only `id` is required. Fields you leave out keep their current value. Returns `null` if no user has that id.

```graphql
mutation {
  updateUser(id: "1", name: "Alice Nguyen") {
    id
    name
    email
  }
}
```

### Delete a user

Returns `true` if the user was deleted and `false` if no user has that id.

```graphql
mutation {
  deleteUser(id: "1")
}
```

## Using variables

Instead of writing values inside the operation, you can pass them as variables. This works for any query or mutation.

```graphql
mutation AddBook($title: String!, $author: String!) {
  addBook(title: $title, author: $author) {
    id
    title
    author
  }
}
```

Put the values in the Variables panel of Apollo Sandbox:

```json
{ "title": "Clean Code", "author": "Robert C. Martin" }
```

## Common errors

| Error | Cause | Fix |
|---|---|---|
| `Field "books" of type "[Book!]!" must have a selection of subfields` | The query asks for an object without saying which fields to return | Add a selection, for example `books { id title }` |
| `Cannot query field "x" on type "Book"` | The field is not declared in the schema | Use a declared field, or add the field to the type in `schema.js` |
| `Field "addBook" argument "author" of type "String!" is required` | A required argument is missing | Pass every argument marked with `!` |

## Adding a new module

1. Create a folder under `src/` with `schema.js`, `resolvers.js` and `mockdata.js`, following the `books` folder.
2. Import its `typeDefs` and `resolvers` in `server.js`.
3. Add them to the `typeDefs` and `resolvers` arrays passed to `ApolloServer`.
