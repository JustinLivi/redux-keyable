import { createActionCreator, FluxStandardAction } from '.';

describe('createActionCreator', () => {
  it('should return the action creator', () => {
    const ACTION_TYPE = 'ACTION_TYPE';
    type ACTION_TYPE = 'ACTION_TYPE';
    interface Action extends FluxStandardAction<ACTION_TYPE> {}
    const actionCreator = (): { type: ACTION_TYPE } => ({
      type: ACTION_TYPE
    });
    expect(createActionCreator<undefined, Action>(actionCreator)).toEqual(
      actionCreator
    );
  });
});
