export type ReduxReducer<StateType, ActionUnion> = (state: StateType, action: ActionUnion) => StateType;
