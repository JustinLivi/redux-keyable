// TypeScript Version: 3.0
import { createActionCreator, FluxStandardAction } from 'redux-keyable';

const ACTION_TYPE = 'ACTION_TYPE';
interface Payload {
  payloadValue: string;
}
interface Meta {
  metaValue: string;
}
interface Action
  extends FluxStandardAction<typeof ACTION_TYPE, Payload, Meta> {}
interface Params {
  paramValue: string;
}
// $ExpectType ActionCreator<Params, Action, "ACTION_TYPE">
createActionCreator<Params, Action>(({ paramValue }) => ({
  type: ACTION_TYPE,
  payload: { payloadValue: paramValue },
  meta: { metaValue: paramValue }
}));
