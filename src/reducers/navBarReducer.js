const navBarReducer = (state = { navBarValue: null }, action) => {
  switch (action.type) {
    case "SWITCH_TABS":
      return {
        ...state,
        navBarValue: action.data
      };
    default:
      return state;
  }
};

export const switchTabs = newValue => ({
  type: "SWITCH_TABS",
  data: newValue
});

export default navBarReducer;
