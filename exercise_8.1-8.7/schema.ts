import { gql } from "apollo-server";

export const schema = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }

  input BookData {
    title: String!
    published: Int!
    author: String!
    genres: [String]
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(bookData: BookData): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
