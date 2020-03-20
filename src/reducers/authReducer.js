const accessTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.data
      };
    default:
      return state;
  }
};

export const setAccessToken = accessToken => ({
  type: "SET_ACCESS_TOKEN",
  data: accessToken
});

export default accessTokenReducer;
