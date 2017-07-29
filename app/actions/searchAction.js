import * as actionTypes from '../constants/search';

export function update(data) {
    return {
        type: actionTypes.SEARCH_UPDATE,
        data
    };
}