import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Author {
  author: string;
  id: number;
}

export interface AuthorsState {
  authors: Author[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: {} | null;
}

const initialState = {
  authors: [],
  status: "idle",
  error: null,
} as AuthorsState;

type GetAuthorsResponse = {
  data: {
    authors: Author[];
  };
};

export const fetchAuthors = createAsyncThunk(
  "/authors",
  async (): Promise<GetAuthorsResponse> => {
    const response = await axios("http://localhost:4000", {
      method: "post",
      data: {
        query: `
           query Authors {
            authors {
              author
              id
            }
          }
        `,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    return data;
  }
);

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      if (action.payload) {
        state.authors = action.payload.data.authors;
      }
      state.status = "succeeded";
    });
    builder.addCase(fetchAuthors.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      state.status = "failed";
    });
  },
});

export const {} = authorsSlice.actions;
