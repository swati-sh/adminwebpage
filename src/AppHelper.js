import {
  getHiresList,
  getApprovalJoinee,
  addNewHire,
  clearAddHire,
  clearApprovalJoinee,
  approvedRequest,
  rejectedRequest,
  clearApprovedData,
  clearRejectedData
} from "./redux/hiresAction";

export const appState = state => ({
  allHiresList: state.groups.allHiresList,
  approvalJoinee: state.groups.approvalJoinee,
  addHire: state.groups.addHire,
  approvedData: state.groups.approvedData,
  rejectedData: state.groups.rejectedData
});

export const appDispatch = dispatch => ({
  getHiresList: () => dispatch(getHiresList()),
  getApprovalJoinee: params => dispatch(getApprovalJoinee(params)),
  addNewHire: params => dispatch(addNewHire(params)),
  approvedRequest: params => dispatch(approvedRequest(params)),
  rejectedRequest: params => dispatch(rejectedRequest(params)),
  clearApprovalJoinee: () => dispatch(clearApprovalJoinee()),
  clearAddHire: () => dispatch(clearAddHire()),
  clearApprovedData: () => dispatch(clearApprovedData()),
  clearRejectedData: () => dispatch(clearRejectedData())
});
