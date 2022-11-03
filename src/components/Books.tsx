import { FunctionComponent } from "react";
import { useQuery, gql } from "@apollo/client";
import BookStyles from "./books.module.css";

interface Book {
  title: string;
  author: string;
  id: number;
  rate?: number;
  notes?: number[];
  img: string;
}

interface BookData {
  books: Book[];
}

const GET_BOOKS = gql`
  query Books {
    books {
      title
      author
      id
      rate
      img
    }
  }
`;

const Books: FunctionComponent = () => {
  const { loading, error, data } = useQuery<BookData>(GET_BOOKS);
  return (
    <div className={BookStyles.container}>
      <h1>BOOKS</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={BookStyles.list}>
          {data?.books.map((book) => (
            <li key={book.id} className={BookStyles.book}>
              <img
                src={
                  book.img ? "/img/" + book.img : "/img/default_book_cover.jpg"
                }
                alt={book.title}
                className={BookStyles.img}
              />
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Rate: {book.rate} / 5</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>Error</p>}
    </div>
  );
};

export default Books;
