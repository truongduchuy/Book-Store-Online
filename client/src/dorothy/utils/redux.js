export function createAction(type, payload) {
  return { type, payload };
}

export function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action);
    }
    return state;
  };
}
