
import { refreshJoke, loadMoreJokes } from "../helpers/fetchJokes";
import { addToLocalStorage, jokesLocal } from "../helpers/localStorage";
import { Joke } from "../types/jokes";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type JokesState = {
  jokes: Joke[];
  loading: boolean;
  error: string;
}

const initialState: JokesState = {
  jokes: [],
  loading: false,
  error: '',
};

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    setJoke: (state, action: PayloadAction<Joke[]>) => {
      state.jokes = [...jokesLocal, ...action.payload].slice(0, 10);
    },
    addJoke: (state, action: PayloadAction<Joke>) => {
      const newJoke = action.payload;
      state.jokes.unshift(newJoke);
      addToLocalStorage(newJoke);
    },
    addJokes: (state, action: PayloadAction<Joke[]>) => {
      state.jokes = [...state.jokes, ...action.payload];
    },
    deleteJoke: (state, action: PayloadAction<number>) => {
      state.jokes = state.jokes.filter(joke => joke.id !== action.payload);
      const selectedJokesString = localStorage.getItem('selectedJokes');
      if (selectedJokesString !== null) {
        const selectedJokes = JSON.parse(selectedJokesString);
        const updatedSelectedJokes = selectedJokes.filter((jokeId: Joke) => jokeId.id !== action.payload);
        localStorage.setItem('selectedJokes', JSON.stringify(updatedSelectedJokes));
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(refreshJoke.pending, (state) => {
        state.error = '';
      })
      .addCase(refreshJoke.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshJoke.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to refresh joke.';
      });
  }
});

export const { actions } = jokesSlice;

export const jokesReducer = jokesSlice.reducer;
export { refreshJoke, loadMoreJokes };
