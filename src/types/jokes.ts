export interface JokesState {
  jokes: Joke[];
  loading: boolean;
  error: null | string;
}

export enum JokesActionTypes {
  FETCH_JOKES = "FETCH_JOKES",
  FETCH_JOKES_SUCCES = "FETCH_JOKES_SUCCES",
  FETCH_JOKES_ERROR = "FETCH_JOKES_ERROR",
}

interface FetchJokesAction {
  type: JokesActionTypes.FETCH_JOKES;
}

interface FetchJokesSuccesAction {
  type: JokesActionTypes.FETCH_JOKES_SUCCES;
  payload: any[];
}

interface FetchJokesErrorAction {
  type: JokesActionTypes.FETCH_JOKES_ERROR;
  payload: string;
}

export type JokeAction = FetchJokesAction | FetchJokesErrorAction | FetchJokesSuccesAction;

export type Joke = {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}