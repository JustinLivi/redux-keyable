# redux-keyable

`redux-keyable` provides a few simple types and helper methods to make your [redux](https://redux.js.org) code more type-safe.

If you're writing in javascript and not typescript, this package has significantly less value.

## Installation

`npm i -s redux-keyable`

### Problem

```typescript
// we create our type-safe action creator
interface ActionCreatorParams {
  value: string;
}
// no problems so far
const actionCreator = ({ value }) => ({
  type: ACTION_TYPE,
  value
}));

// later in our reducer...
interface State {
  storedValue: string;
}
// here we have a problem, since our action is the intersection of ALL
// of our actions. How do we easily type this without resorting to something
// like https://github.com/piotrwitek/typesafe-actions#with-type-constants?
const reducer(state: State, action) {
  // this gets messy fast
}
```

## Solution

```typescript
import {
  combineKeyableReducers,
  createActionCreator,
  createKeyableReducer,
  FluxStandardAction
} from 'redux-keyable';

// flux standard action type
const ACTION_TYPE = 'ACTION_TYPE';
// flux standard action
interface Action extends FluxStandardAction<typeof ACTION_TYPE> {
  value: string;
}
// createActionCreator is a helper method that accepts the parameters of our
const actionCreator = createActionCreator<{ value: string }, Action>(
  ({ value }) => ({
    type: ACTION_TYPE,
    value
  })
);

interface State {
  storedValue: string;
}
// we pass our state type and action type as generic parameters...
// everything here is clean so far, but how do we ensure only the right
// action reaches this reducer?
const keyableReducer = createKeyableReducer<State, Action>(
  ACTION_TYPE,
  (state, { value }) => ({
    ...state,
    storedValue: value
  })
);

// everything will get handled auto-magically by combineKeyableReducers
const defaultState = {
  storedValue: 'default'
};
const reducer = combineKeyableReducers<State>(defaultState)(
  keyableReducer,
  // we can pass additional keyable reducers here that will accept the same
  // state type
  reducerNotShownInExample
);
```
