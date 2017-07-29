import {get} from '../get';
import {post} from '../post';

export function getDetailList(listName) {
    const result = get('/api/detail/' + encodeURIComponent(listName));
    return result;
}

export function postSwitchState(listName, itemName, status) {
    const params = {
        list_name: listName,
        item_name: itemName,
        is_not_done: status
    };
    const result = post('/api/switchstate', params);
    return result;
}

export function postAddTodo(listName, itemName, date) {
    const params = {
        list_name: listName,
        item_name: itemName,
        deadline: date
    };
    const result = post('/api/detailadd', params);
    return result;
}