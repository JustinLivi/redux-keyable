// TypeScript Version: 3.1
export interface FluxStandardAction<ActionType extends string = any> {
    type: ActionType;
}
export declare type ReducerMethod<State, ReducerAction extends FluxStandardAction<ActionType> = any, ActionType extends string = ReducerAction['type']> = (state: State, action: ReducerAction) => State;
export interface KeyableReducer<State, ReducerAction extends FluxStandardAction = any, ActionType extends string = ReducerAction['type']> {
    type: ActionType;
    reducer: ReducerMethod<State, ReducerAction>;
}
export declare type ActionCreator<Params, A extends FluxStandardAction<ActionType>, ActionType extends string = A['type']> = (params: Params) => A;
export declare const createActionCreator: <Params, A extends FluxStandardAction<ActionType>, ActionType extends string = A["type"]>(actionCreator: ActionCreator<Params, A, ActionType>) => ActionCreator<Params, A, ActionType>;
export declare const createKeyableReducer: <State, ReducerAction extends FluxStandardAction<ActionType>, ActionType extends string = ReducerAction["type"]>(type: ActionType, reducer: ReducerMethod<State, ReducerAction, ReducerAction["type"]>) => KeyableReducer<State, ReducerAction, ActionType>;
export declare const combineKeyableReducers: <State>(defaultState: State) => (...keyableReducers: KeyableReducer<State, any, any>[]) => (baseState: State | undefined, action: FluxStandardAction<any>) => State;
