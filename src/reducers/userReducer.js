const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
};

export const setUser = user => ({
  type: "SET_USER",
  data: user
});

export default userReducer;
