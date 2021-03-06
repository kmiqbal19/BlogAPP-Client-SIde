const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        fetchError: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        fetchError: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        fetchError: true,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        fetchError: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        fetchError: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        fetchError: false,
      };

    default:
      return state;
  }
};
export default Reducer;
