import * as actionTypes from '../constants/search';

export default function (state = {}, action) {
    switch (action.type) {
        case actionTypes.SEARCH_UPDATE:
            return action.data;
        default:
            return state;
    }
}