import { FunctionComponent } from "react";
import { useQuery, gql } from "@apollo/client";

interface Author {
  author: string;
  id: number;
}

interface AuthorData {
  authors: Author[];
}

const GET_AUTHORS = gql`
  query Authors {
    authors {
      author
      id
    }
  }
`;

const Authors: FunctionComponent = () => {
  const { loading, error, data } = useQuery<AuthorData>(GET_AUTHORS);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>AUTHORS</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data?.authors.map((author) => (
            <li key={author.id}>
              <p>{author.author}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>Error</p>}
    </div>
  );
};

export default Authors;
