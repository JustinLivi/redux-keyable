import { createActionCreator, FluxStandardAction } from '.';

describe('createActionCreator', () => {
  const ACTION_TYPE = 'ACTION_TYPE';
  interface Action extends FluxStandardAction<typeof ACTION_TYPE> {}

  it('should return the action creator', () => {
    const actionCreator = (): { type: typeof ACTION_TYPE } => ({
      type: ACTION_TYPE
    });
    expect(createActionCreator<undefined, Action>(actionCreator)).toEqual(
      actionCreator
    );
  });
});
