import {
        getHiresList,
        getApprovalJoinee,
        addNewHire,
        clearAddHire,
        clearApprovalJoinee
} from './redux/hiresAction';

export const appState = (state) => ({
        allHiresList: state.groups.allHiresList,
        approvalJoinee: state.groups.approvalJoinee,
        addHire: state.groups.addHire
})

export const appDispatch = (dispatch) => ({
        getHiresList: () => dispatch(getHiresList()),
        getApprovalJoinee: (params) => dispatch(getApprovalJoinee(params)),
        addNewHire: (params) => dispatch(addNewHire(params)),
        clearApprovalJoinee: () => dispatch(clearApprovalJoinee()),
        clearAddHire: () => dispatch(clearAddHire())
})