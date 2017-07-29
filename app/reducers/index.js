import {combineReducers} from 'redux';
import todoList from './todoList';
import todoListDetail from './todoListDetail';
import search from './search'

export default combineReducers({
    todoList,
    todoListDetail,
    search
});