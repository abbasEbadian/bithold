export const userState = {
    user: {},
    authenticated: false,
    loading: false0
}

export default userReducer =  (state = userState, action) => {
    switch (action.type) {
      case 'setUser':
        return {
          ...state,
          user: action.payload,
        };
      case 'setAuthenticated':
        return {
          ...state,
          authenticated: action.payload,
        };
      case 'setLoading':
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };