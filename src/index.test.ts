// tslint:disable-next-line:no-implicit-dependencies
import 'jest-extended';

import { combineKeyableReducers, createActionCreator, createKeyableReducer, FluxStandardAction, ReducerMethod } from '.';

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

describe('combineKeyableReducers', () => {
  it('should return a keyable-reducer combiner', () => {
    expect(combineKeyableReducers({})).toBeFunction();
  });

  it('should call the reducer whose type matches', () => {
    const reduce = combineKeyableReducers({});
    const keyableReducers = [
      {
        type: 'ACTION_1',
        reducer: jest.fn()
      },
      {
        type: 'ACTION_2',
        reducer: jest.fn()
      }
    ];
    reduce(...keyableReducers)(
      {
        provided: 'value'
      },
      {
        type: 'ACTION_1'
      }
    );
    expect(keyableReducers[0].reducer).toBeCalledWith(
      {
        provided: 'value'
      },
      {
        type: 'ACTION_1'
      }
    );
    expect(keyableReducers[1].reducer).not.toBeCalled();
  });

  it('should handle duplicate type matches', () => {
    const reduce = combineKeyableReducers({});
    const keyableReducers = [
      {
        type: 'ACTION_1',
        reducer: jest.fn()
      },
      {
        type: 'ACTION_1',
        reducer: jest.fn()
      }
    ];
    reduce(...keyableReducers)(
      {
        provided: 'value'
      },
      {
        type: 'ACTION_1'
      }
    );
    expect(keyableReducers[0].reducer).toBeCalled();
    expect(keyableReducers[1].reducer).toBeCalled();
  });

  it('should utilize default state', () => {
    const reduce = combineKeyableReducers({
      defaultState: true
    });
    const reducer = jest.fn();
    reduce({
      type: 'ACTION_1',
      reducer
    })(undefined, {
      type: 'ACTION_1'
    });
    expect(reducer).toBeCalledWith(
      {
        defaultState: true
      },
      {
        type: 'ACTION_1'
      }
    );
  });
});
