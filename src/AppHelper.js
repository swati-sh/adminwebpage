import {getHiresList} from './redux/hiresAction';

export const appState = (state) => ({
        allHiresList: state.groups.allHiresList
})

export const appDispatch = (dispatch) => ({
        getHiresList: () => dispatch(getHiresList())
})