import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

export interface Book {
  title: string;
  author: string;
  id: number;
  rate?: number;
  notes?: number[];
  img: string;
}

interface Author {
  author: string;
  id: number;
}

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    id: 1,
    rate: 3.7,
    notes: [2.4, 4.7, 3.6],
    img: "the_awakening.jpg",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    id: 2,
    rate: 3.8,
    notes: [2.1, 4.3, 2.4],
    img: "city_of_glass.jpg",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    id: 3,
    rate: 4.1,
    img: "war_and_peace.jpeg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    id: 4,
    rate: 4.3,
    img: "pride_and_prejudice.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    id: 5,
    rate: 4.3,
    img: "to_kill_a_mockingbird.jpg",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    id: 6,
    rate: 3.5,
    img: "moby_dick.jpeg",
  },
  {
    title: "Memoirs of a Geisha",
    author: "Arthor Golden",
    id: 7,
    rate: 4.1,
    img: "default_book_cover.jpg",
  },
  {
    title: "Carrie",
    author: "Stephen King",
    id: 8,
    rate: 4,
    img: "default_book_cover.jpg",
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    id: 9,
    rate: 4.3,
    img: "sherlock.jpeg",
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    id: 10,
    rate: 3.9,
    img: "default_book_cover.jpg",
  },
  {
    title: "The Call of the Wild",
    author: "Jack London",
    id: 11,
    rate: 3.9,
    img: "default_book_cover.jpg",
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    id: 12,
    rate: 4.1,
    img: "default_book_cover.jpg",
  },
];

function getAuthors(): Author[] {
  const authors = books.map(({ author, id }) => ({ author, id }));

  return authors;
}

const resolvers = {
  Query: {
    books: () => books,
    authors: () => getAuthors(),
    bookById: (parent, args, context, info) => {
      const { id } = args;

      const book = books.find((b) => b.id === id);
      let avg = null;
      if (book?.notes?.length) {
        avg =
          Math.floor(
            (book.notes.reduce((acc, curr) => acc + curr) / book.notes.length) *
              100
          ) / 100;
      }

      return { ...book, avg };
    },
  },
};

const typeDefs = `#graphql

    type Book {
        title: String
        author: String
        id: Int
        rate: Float
        img: String
    }

    type BookAvg {
      title: String
      author: String
      id: Int
      rate: Float
      avg: Float
      img: String
    }

    type Author {
        author: String
        id: Int
    }

    type Query {
        books: [Book]
        book: Book
        authors: [Author]
        bookById(id: Int): BookAvg
    }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
