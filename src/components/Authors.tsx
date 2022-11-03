import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../features/authorsSlice";
import { AppThunkDispatch, useAppSelector } from "../store/store";

const Authors: FunctionComponent = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const { authors, status, error } = useAppSelector((state) => state.authors);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);

  if (status === "pending") return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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

      <ul>
        {authors &&
          authors.map((author) => (
            <li key={author.id}>
              <p>{author.author}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Authors;
