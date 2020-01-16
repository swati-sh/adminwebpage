import * as myConstants from "../utilities/constants";
const initialState = {
  data: "",
  allHiresList: null,
  approvalJoinee: null,
  addHire: null,
  approvedData: null,
  rejectedDataL: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case myConstants.GET_HIRE_LIST:
      if (!action.payload) {
        return Object.assign({}, state, { data: null });
      }
      let groups = [];
      if (action.payload.status === 200) {
        groups = action.payload.data;
      }
      return Object.assign({}, state, {
        allHiresList: groups
      });
    case myConstants.GET_APPROVAL_JOINEE:
      if (!action.payload) {
        return Object.assign({}, state, { data: null });
      }
      let data = [];
      if (action.payload.status === 200) {
        data = action.payload.data;
      }
      return Object.assign({}, state, {
        approvalJoinee: data
      });
    case myConstants.ADD_HIRE:
      if (!action.payload) {
        return Object.assign({}, state, { data: null });
      }
      let success = "",
        error = "";
      if (action.payload.status === 200 || action.payload.status === 204) {
        success = action.payload;
      } else {
        error = action.payload;
      }
      return Object.assign({}, state, {
        addHire: {
          results: success,
          error: error
        }
      });
    case myConstants.APPROVED_REQUEST:
      if (!action.payload) {
        return Object.assign({}, state, { data: null });
      }
      let value = "",
        errorValue = "";
      if (action.payload.status === 200 || action.payload.status === 204) {
        value = action.payload;
      } else {
        errorValue = action.payload;
      }
      return Object.assign({}, state, {
        approvedData: {
          results: value,
          error: errorValue
        }
      });
    case myConstants.REJECTED_REQUEST:
      if (!action.payload) {
        return Object.assign({}, state, { data: null });
      }
      let successVal = "",
        errorVal = "";
      if (action.payload.status === 200 || action.payload.status === 204) {
        successVal = action.payload;
      } else {
        errorVal = action.payload;
      }
      return Object.assign({}, state, {
        rejectedData: {
          results: successVal,
          error: errorVal
        }
      });

    case myConstants.CLEAR_ADD_HIRE: {
      return Object.assign({}, state, {
        data: null,
        addHire: null
      });
    }

    case myConstants.CLEAR_APPROVAL_JOINEE:
      return Object.assign({}, state, {
        data: null,
        approvalJoinee: null
      });

    case myConstants.CLEAR_REJECTED_DATA:
      return Object.assign({}, state, {
        data: null,
        rejectedData: null
      });

    case myConstants.CLEAR_APPROVED_DATA:
      return Object.assign({}, state, {
        data: null,
        approvedData: null
      });

    default:
      return state;
  }
}
