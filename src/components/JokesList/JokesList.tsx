import React, { memo, useEffect } from 'react';
import { JokesState } from '../../types/jokes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { JokeItem } from '../JokeItem/JokeItem';
import { actions, loadMoreJokes } from '../../features/jokesReducer';
import axios from 'axios';

const JokesList = memo(() => {
  const { jokes, error, loading } = useAppSelector((state: { jokes: JokesState }) => state.jokes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const response = axios.get('https://official-joke-api.appspot.com/jokes/ten/')
    const joke = response.then(res => {
      dispatch(actions.setJoke(res.data))
    })
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMoreJokes());
  };

  if (loading) {
    return <p>Loading jokes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="jokes-list">
        {jokes.map((joke) => (
          <JokeItem
            type={joke.type}
            id={joke.id}
            setup={joke.setup}
            punchline={joke.punchline}
            key={joke.id}
          />
        ))}
      </div>
      <div className="button-container">
        <button className="load-more" onClick={handleLoadMore}>Load More</button>
      </div>
    </>
  );
});

export default JokesList;
