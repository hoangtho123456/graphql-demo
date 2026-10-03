import { BOOKS as books } from './mockdata.js';

let nextId = books.length + 1;

export const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id === id),
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            if (books.some(book => book.title === title)) {
                throw new Error(`Book with title "${title}" already exists.`);
            }
            const newBook = { id: String(nextId++), title, author };
            books.push(newBook);
            return newBook;
        },
        updateBook: (_, { id, title, author }) => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) return null;
            
            const updatedBook = {
                ...books[bookIndex],
                title: title ?? books[bookIndex].title,
                author: author ?? books[bookIndex].author,
            }
            books[bookIndex] = updatedBook;
            return updatedBook;
        },
        deleteBook: (_, { id }) => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) return false;
            books.splice(bookIndex, 1);
            return true;
        }
    }
};
