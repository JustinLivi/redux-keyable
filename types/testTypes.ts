import { createActionCreator, FluxStandardAction } from 'redux-keyable';

const ACTION_TYPE = 'ACTION_TYPE';
interface Payload {
  payloadValue: string;
}
interface Meta {
  metaValue: string;
}
interface Action extends FluxStandardAction<typeof ACTION_TYPE> {}
interface Params {
  paramValue: string;
}
// $ExpectType ActionCreator<Params, Action, "ACTION_TYPE">
createActionCreator<Params, Action>(({ paramValue }) => ({
  type: ACTION_TYPE,
  payload: { payloadValue: paramValue },
  meta: { metaValue: paramValue }
}));

// $ExpectError
createActionCreator<Params, {}>(({}) => ({
  type: ACTION_TYPE
}));

createActionCreator<Params, Action>(({}) => ({
  // $ExpectError
  type: 'INVALID'
}));
