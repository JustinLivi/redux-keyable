// TypeScript Version: 3.1
export interface FluxStandardAction<ActionType extends string = any, Payload = any, Meta = any> {
    type: ActionType;
    payload?: Payload;
    meta?: Meta;
}
export declare type ReducerMethod<State, ReducerAction extends FluxStandardAction<ActionType> = FluxStandardAction, ActionType extends string = ReducerAction['type']> = (state: State, action: ReducerAction) => State;
export interface KeyableReducer<State, ReducerAction extends FluxStandardAction<ActionType> = FluxStandardAction, ActionType extends string = ReducerAction['type']> {
    type: ActionType;
    reducer: ReducerMethod<State, ReducerAction>;
}
export declare type ActionCreator<Params, A extends FluxStandardAction<ActionType>, ActionType extends string = A['type']> = (params: Params) => A;
export declare const createActionCreator: <Params = never, A extends FluxStandardAction<ActionType, any, any> = never, ActionType extends string = A["type"]>(actionCreator: ActionCreator<Params, A, ActionType>) => ActionCreator<Params, A, ActionType>;
export declare const createKeyableReducer: <State = never, ReducerAction extends FluxStandardAction<ActionType, any, any> = never, ActionType extends string = ReducerAction["type"]>(type: ActionType, reducer: ReducerMethod<State, ReducerAction, ReducerAction["type"]>) => {
    reducer: ReducerMethod<State, ReducerAction, ReducerAction["type"]>;
    type: ActionType;
};
export declare const combineKeyableReducers: <State = never>(defaultState: State) => (...keyableReducers: KeyableReducer<State, FluxStandardAction<any, any, any>, any>[]) => (baseState: State | undefined, action: FluxStandardAction<any, any, any>) => State;
