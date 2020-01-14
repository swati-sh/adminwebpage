import * as myConstants from '../utilities/constants';

const initialState = {
        data:'',
        allHiresList: null

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

               default: return state;

        }
}