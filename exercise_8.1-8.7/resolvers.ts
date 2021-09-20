import { authors, books, editAuthors } from "./db-utils";
import { v4 as uuid } from "uuid";
import { Author } from "./types";

export const resolvers = {
  Author: {
    bookCount: (parent: any, args: any) => {
      return books.filter((book) => book.author === parent.name).length;
    },
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (parent: any, args: any) => {
      const { author, genre } = args;
      let filteredBooks = books;
      if (author) {
        filteredBooks = filteredBooks.filter((book) => book.author === author);
      }
      if (genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: () => authors,
  },

  Mutation: {
    addBook: (parent: any, args: any) => {
      const { bookData } = args;
      if (!authors.find((author) => author.name === bookData.author)) {
        const userId = uuid();
        let author = { id: userId, name: bookData.author };
        authors.push(author);
      }
      const id = uuid();
      let book = { ...bookData, id };
      books.push(book);
      return book;
    },

    editAuthor: (parent: any, args: any) => {
      const { name, setBornTo } = args;
      let authorFound = authors.find((author) => author.name === name);

      if (!authorFound) {
        return null;
      }
      const authorToBeEdited = { ...authorFound, born: setBornTo };
      const modifiedAuthors = authors.map((author) => {
        return author.name === name ? authorToBeEdited : author;
      });
      editAuthors(modifiedAuthors);
      return authorToBeEdited;
    },
  },
};
