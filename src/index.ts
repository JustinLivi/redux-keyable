import { forEach, isArray, reduce, union } from 'lodash';

export interface FluxStandardAction<ActionType extends string = any> {
  type: ActionType;
}

export type ReducerMethod<
  State,
  ReducerAction extends FluxStandardAction<ActionType> = any,
  ActionType extends string = ReducerAction['type']
> = (state: State, action: ReducerAction) => State;

export interface KeyableReducer<
  State,
  ReducerAction extends FluxStandardAction = any,
  ActionType extends string = ReducerAction['type']
> {
  type: ActionType;
  reducer: ReducerMethod<State, ReducerAction>;
}

export type ActionCreator<
  Params,
  A extends FluxStandardAction<ActionType>,
  ActionType extends string = A['type']
> = (params: Params) => A;

export const createActionCreator = <
  Params,
  A extends FluxStandardAction<ActionType>,
  ActionType extends string = A['type']
>(
  actionCreator: ActionCreator<Params, A, ActionType>
) => actionCreator;

export const createKeyableReducer = <
  State,
  ReducerAction extends FluxStandardAction<ActionType>,
  ActionType extends string = ReducerAction['type']
>(
  type: ActionType,
  reducer: ReducerMethod<State, ReducerAction>
): KeyableReducer<State, ReducerAction, ActionType> => ({
  reducer,
  type
});

export const combineKeyableReducers = <State>(defaultState: State) => (
  ...keyableReducers: Array<KeyableReducer<State>>
) => {
  const defaultAccumulator: {
    [type: string]: Array<ReducerMethod<State>>;
  } = {};
  const reducerMap = reduce(
    keyableReducers,
    (accumulator, { type, reducer }) =>
      !isArray(accumulator[type])
        ? {
            ...accumulator,
            [type]: [reducer]
          }
        : {
            ...accumulator,
            [type]: union(accumulator[type], [reducer])
          },
    defaultAccumulator
  );
  return (
    baseState: State = defaultState,
    action: FluxStandardAction
  ): State => {
    let newState: State = baseState;
    const keyedReducers = reducerMap[action.type];
    if (isArray(keyedReducers)) {
      forEach(keyedReducers, reducer => {
        newState = reducer(newState, action);
      });
    }
    return newState;
  };
};
