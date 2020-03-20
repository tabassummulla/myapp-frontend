const profileReducer = (state = { profile: [] }, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};

export default profileReducer;
