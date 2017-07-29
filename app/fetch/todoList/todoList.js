import {get} from '../get';
import {post} from '../post';

export function getToDOList() {
    const result = get('/api/todolist');
    return result;
}

export function postNewToDOItem(data) {
    const result = post('/api/createlist', data);
    return result;
}