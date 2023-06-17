import React, { memo, useCallback } from 'react';
import { actions, refreshJoke } from '../../features/jokesReducer';
import { Joke } from '../../types/jokes';
import { useAppDispatch } from '../../app/hooks';

type Props = Joke;

export const JokeItem = memo((props: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteClick = useCallback(() => {
    dispatch(actions.deleteJoke(props.id));
  }, [dispatch, props.id]);

  const handleAddClick = useCallback(() => {
    dispatch(actions.addJoke(props));
  }, [dispatch, props]);

  const handleRefreshClick = useCallback(() => {
    dispatch(refreshJoke(props.id));
  }, [dispatch, props.id]);

  return (
    <div className='card'>
      <div className="container">
        <h2 className="card__title"> Type: <span className="card__title-blue">{props.type}</span></h2>
        <h2 className="card__id"> #id {props.id}</h2>
      </div>

      <div className="content">
        <h3 className="card__setup">Setup: <span className="card__setup-italic">{props.setup}</span></h3>

        <h3 className="card__punchline">Punchline:</h3>
        <p className="card__punchline-text">{props.punchline}</p>
      </div>


      <div className="buttons-container">
        <div className="buttons">
          <button className="button" onClick={handleDeleteClick}>Delete</button>
          <button className="button" onClick={handleAddClick}>Add</button>
          <button className="button" onClick={handleRefreshClick}>Refresh</button>
        </div>
      </div>
    </div>
  );
});
