# redux-keyable

[![Gitlab pipeline status](https://img.shields.io/gitlab/pipeline/justinlivi/redux-keyable.svg)](https://gitlab.com/justinlivi/redux-keyable/pipelines)
[![Coverage Status](https://coveralls.io/repos/gitlab/justinlivi/redux-keyable/badge.svg?branch=master)](https://coveralls.io/gitlab/justinlivi/redux-keyable?branch=master)
[![David](https://img.shields.io/david/justinlivi/redux-keyable.svg)](https://github.com/JustinLivi/redux-keyable/blob/master/package.json)
[![NPM](https://img.shields.io/npm/l/redux-keyable.svg)](https://www.npmjs.com/package/redux-keyable)
[![npm](https://img.shields.io/npm/v/redux-keyable.svg)](https://www.npmjs.com/package/redux-keyable)
[![Greenkeeper badge](https://badges.greenkeeper.io/JustinLivi/redux-keyable.svg)](https://greenkeeper.io/)
[![npm type definitions](https://img.shields.io/npm/types/redux-keyable.svg)](https://github.com/JustinLivi/redux-keyable/blob/master/package.json)

> Because type-safe redux should be easier.

# Installation

`npm i -s redux-keyable`

# Why redux-keyable?

## Problem

Building an action creator in a type-safe manner is straight forward...

```typescript
interface ActionCreatorParams {
  value: string;
}

const actionCreator = ({ value }: ActionCreatorParams) => ({
  type: ACTION_TYPE,
  value
}));
```

But later when we go to write our reducers we have a problem since our reducers will accept ALL of our actions.

```typescript
interface State {
  storedValue: string;
}

const type AllActions = ???;

const reducer = (state: State, action: AllActions) => {
  // this gets messy fast
}
```

How do we easily type this?

People have solved this various ways:

- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
- [redux recipes](https://redux.js.org/recipes/usage-with-typescript)

Most solutions boil down to type-narrowing via a switch statement keying off a flux standard action `type` key.

```typescript
switch (action.type) {
  case ADD:
    return [...state, action.payload];
  case TOGGLE:
    return state.map(item =>
      item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    );
  default:
    return state;
}
```

Can we do better?

## Solution

We first define a flux standard action type constant as usual.

```typescript
const ACTION_TYPE = 'ACTION_TYPE';
```

Then we type our action using the `FluxStandardAction` helper interface. We'll use our action definition in both our reducer and our action creator.

```typescript
interface Action extends FluxStandardAction<typeof ACTION_TYPE> {
  value: string;
}
```

We use our action definition to define the type of our action creator. The first generic argument is the type of arguments to pass to our creator, and the second is our action type. Passing in our types as generic arguments will help ensure that our action creator matches our reducer.

```typescript
const actionCreator = createActionCreator<{ value: string }, Action>(
  ({ value }) => ({
    type: ACTION_TYPE,
    value
  })
);
```

When we go to create our reducers, we use the createKeyableReducer helper method and pass our state type and action type as generic parameters.
Our action type and reducer are passed as arguments to the method.
Our reducer will _only_ ever get called for actions matching our specified type.
No more giant switch statement, and we're still fully type safe!

```typescript
interface State {
  storedValue: string;
}

const keyableReducer = createKeyableReducer<State, Action>(
  ACTION_TYPE,
  (state, { value }) => ({
    ...state,
    storedValue: value
  })
);
```

Then we finally combine all our keyable reducers acting on this state into one standard redux reducer.
This can be used either as our root reducer or passed to utility methods like reduce-reducers.

```typescript
// provide a default state
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

# Basic Usage

Create our action interface and our action creator.

```typescript
// changeDetailsAction.ts
import { createActionCreator, FluxStandardAction } from 'redux-keyable';

export interface DetailsUpdates {
  address: string;
  fullname: string;
}

export const CHANGE_DETAILS = 'CHANGE_DETAILS';

export interface ChangeDetailsAction
  extends FluxStandardAction<typeof CHANGE_DETAILS> {
  payload: DetailsUpdates;
}

export const changeDetails = createActionCreator<
  DetailsUpdates,
  ChangeDetailsAction
>(payload => ({
  payload,
  type: CHANGE_DETAILS
}));
```

Create our keyable reducer and our standard root reducer.

```typescript
// changeDetailsReducer.ts
import { combineKeyableReducers, createKeyableReducer } from 'redux-keyable';
import { CHANGE_DETAILS, ChangeDetailsAction } from '../changeDetailsAction';
import { initialState, State } from '../stateDefinition';

export const changeDetailsReducer = createKeyableReducer<
  State,
  ChangeDetailsAction
>(CHANGE_DETAILS, (state, { payload }) => ({
  ...state,
  user: {
    ...state.user,
    ...payload
  }
}));

export const updateDetailsStandardRootReducer = combineKeyableReducers<State>(
  initialState
)(changeDetailsReducer);
```

# License

Licensed under [MIT](https://github.com/JustinLivi/redux-keyable/blob/master/LICENSE)
