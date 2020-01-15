import {getHiresList} from './redux/hiresAction';
import {getApprovalJoinee} from './redux/hiresAction';

export const appState = (state) => ({
        allHiresList: state.groups.allHiresList,
        approvalJoinee: state.groups.approvalJoinee
})

export const appDispatch = (dispatch) => ({
        getHiresList: () => dispatch(getHiresList()),
        getApprovalJoinee: (params) => dispatch(getApprovalJoinee(params))

})