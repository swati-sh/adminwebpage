import axios from 'axios';
import * as myConstants from '../utilities/constants';
export function getHiresList() {
        let request = axios.request({
                url:  "https://piktordigitalid.herokuapp.com/api/onboarding/getAllJoinee",
                method: "GET",
        });
        return {
                type:myConstants.GET_HIRE_LIST,
                payload:request,
        };
}

export function getApprovalJoinee(params) {
        let request = axios.request({
                url: `https://piktordigitalid.herokuapp.com/api/login/loginByMail?email=${params}`,
                method:"GET",
        });return {
                type: myConstants.GET_APPROVAL_JOINEE,
                payload: request,
        }
}

export function addNewHire(params) {
        let request = axios.request({
                url: "https://piktordigitalid.herokuapp.com/api/onboarding/addNewJoinee",
                method: "POST",
                data: params,
        });
        return {
                type: myConstants.ADD_HIRE,
                payload: request
        }
}

export function clearApprovalJoinee() {
        return {
                type:myConstants.CLEAR_APPROVAL_JOINEE,
                payload: null
        }
}

export function clearAddHire() {
        return {
                type: myConstants.CLEAR_ADD_HIRE,
                payload: null
        }
}