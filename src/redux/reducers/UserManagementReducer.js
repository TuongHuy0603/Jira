import { GET_USER_MANAGEMENT } from "../constants/Cyberbugs/UserConstatnts";

const initialState = {
  userList: [],
};

export const UserManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MANAGEMENT:
      console.log(action);
      state.userList = action.userList;
      return { ...state };

    default:
      return state;
  }
};
