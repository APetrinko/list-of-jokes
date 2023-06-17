import { Joke } from "../types/jokes";

export const addToLocalStorage = (jokeId: Joke) => {
  const selectedJokesString = localStorage.getItem('selectedJokes');
  const selectedJokes = selectedJokesString ? JSON.parse(selectedJokesString) : [];
  selectedJokes.push(jokeId);
  localStorage.setItem('selectedJokes', JSON.stringify(selectedJokes));
};

const getFromLocalStorage = () => {
  const selectedJokesString = localStorage.getItem('selectedJokes');
  if (selectedJokesString !== null) {
    const selectedJokes = JSON.parse(selectedJokesString);
    return selectedJokes;
  }
  return [];
};

export const jokesLocal = getFromLocalStorage();