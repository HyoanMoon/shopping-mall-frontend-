import * as types from "../constants/user.constants";
const initialState = {
  loading:false,
  user:null,
  error: null,

};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type){
    case types.REGISTER_USER_REQUEST:
      case types.LOGIN_REQUEST:
        return{
          ...state,
          loading:true,
          error: null, // 요청 시 오류 초기화
        } //Request 

    case types.LOGIN_SUCCESS:
        return{
          ...state,
          loading:false,
          user: payload.user,
          error: null, // 성공 시 오류 초기화
        } //Success

    case types.REGISTER_USER_FAIL:
      case types.LOGIN_FAIL:
        return{
          ...state,
          loading:false,
          error: payload
        } //Fail

    case 'CLEAR_ERROR': 
        return {
          ...state,
          error: null,
        };

    default:
        return state;
  }
}
export default userReducer;




// import * as types from "../constants/user.constants";
// const initialState = {
//   error: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.REGISTER_USER_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     case types.REGISTER_USER_SUCCESS:
//       return {
//         ...state,
//         error: null,
//       };
//     // 기타 케이스...
//     default:
//       return state;
//   }
// };

// export default userReducer;

