import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { taskThunkActions } from '../../../store/task';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskThunkActions.getTasks());

    return () => {};
  }, [dispatch]);

  return <div>Hello</div>;
};
