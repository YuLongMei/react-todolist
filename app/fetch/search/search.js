import {get} from '../get';

export function getSearchList(keyword) {
    const result = get('/api/search/' + encodeURIComponent(keyword));
    return result;
}