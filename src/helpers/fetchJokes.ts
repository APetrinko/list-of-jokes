import { createAsyncThunk } from "@reduxjs/toolkit";
import { actions } from "../features/jokesReducer";
import { Joke } from "../types/jokes";

export const refreshJoke = createAsyncThunk(
  'jokes/refresh',
  async (jokeIdToDelete: number, { dispatch }) => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await response.json();

      const newJoke: Joke = {
        id: data.id,
        setup: data.setup,
        type: data.type,
        punchline: data.punchline,
      };

      dispatch(actions.deleteJoke(jokeIdToDelete));
      dispatch(actions.addJoke(newJoke));
    } catch (error) {
      console.log('Error fetching new joke:', error);
    }
  }
);

export const loadMoreJokes = createAsyncThunk(
  'jokes/loadMore',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_ten');
      const data = await response.json();

      const newJokes: Joke[] = data.map((jokeData: any) => ({
        id: jokeData.id,
        setup: jokeData.setup,
        type: jokeData.type,
        punchline: jokeData.punchline,
      }));

      dispatch(actions.addJokes(newJokes));
    } catch (error) {
      console.log('Error fetching jokes:', error);
    }
  }
);