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
const reducer = (state: State, action) => {
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

// createActionCreator is typing helper identity method
const actionCreator = createActionCreator<{ value: string }, Action>(
  ({ value }) => ({
    type: ACTION_TYPE,
    value
  })
);

interface State {
  storedValue: string;
}

// we pass our state type and action type as generic parameters to createKeyableReducer.
// we pass our action type and reducer as arguments to the method.
// our reducer will only ever get called for actions matching our specified type
const keyableReducer = createKeyableReducer<State, Action>(
  ACTION_TYPE,
  (state, { value }) => ({
    ...state,
    storedValue: value
  })
);

// optionally provide a default state
const defaultState = {
  storedValue: 'default'
};

// combine all our keyable reducers acting on this state into one standard
// redux reducer. This can be used either as our root reducer or passed to
// utility methods like reduce-reducers
const reducer = combineKeyableReducers<State>(defaultState)(
  keyableReducer,
  // we can pass additional keyable reducers here that will accept the same
  // state type
  reducerNotShownInExample
);
```
