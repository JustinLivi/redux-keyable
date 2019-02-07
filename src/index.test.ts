import { createActionCreator, createKeyableReducer, FluxStandardAction, ReducerMethod } from '.';

const ACTION_TYPE = 'ACTION_TYPE';
interface Action extends FluxStandardAction<typeof ACTION_TYPE> {
  value: string;
}

describe('createActionCreator', () => {
  it('should return the action creator', () => {
    const actionCreator = (): Action => ({
      type: ACTION_TYPE,
      value: 'value'
    });
    expect(createActionCreator<undefined, Action>(actionCreator)).toEqual(
      actionCreator
    );
  });
});

describe('createKeyableReducer', () => {
  it('should return a keyable reducer', () => {
    interface State {
      value: string;
    }
    const reducer: ReducerMethod<State, Action, 'ACTION_TYPE'> = (
      state,
      action
    ) => ({
      ...state,
      ...action
    });
    expect(createKeyableReducer<State, Action>(ACTION_TYPE, reducer)).toEqual({
      reducer,
      type: ACTION_TYPE
    });
  });
});
