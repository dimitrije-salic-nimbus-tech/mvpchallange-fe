export type ReduxAction<ActionType extends string = string, ActionPayload = unknown> = {
    type: ActionType;
    payload?: ActionPayload;
};
