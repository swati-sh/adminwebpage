import * as myConstants from '../utilities/constants';
const initialState = {
        data:'',
        allHiresList: null,
        approvalJoinee: null,

}

export default function (state = initialState, action ){
        switch(action.type){
                case myConstants.GET_HIRE_LIST:
                        if(!action.payload){
                                return Object.assign({},state,{data:null})
                        }
                        let groups = [];
                        if(action.payload.status  === 200) {
                                groups = action.payload.data;
                        }
                        return Object.assign({}, state, {
                                allHiresList: groups
                        })
                case myConstants.GET_APPROVAL_JOINEE: 
                         if(!action.payload){
                                 return Object.assign({},state,{data:null})
                         } 
                         let data = [];
                         if(action.payload.status === 200) {
                                 data=action.payload.data;
                         } return  Object.assign({}, state, {
                                approvalJoinee: data
                        })
               default: return state;

        }
}