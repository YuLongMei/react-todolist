
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// 链接redux所需
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoListDetailActionsFromOtherFile from '../../../actions/todoListDetailActions';

// 请求
import {getDetailList} from '../../../fetch/todoListDetail/todoListDetail';
import {postSwitchState} from '../../../fetch/todoListDetail/todoListDetail';
import {postAddTodo} from '../../../fetch/todoListDetail/todoListDetail';

// component
import DetailListComponent from '../../../components/DetailListComponent/index';

// text
import {createTodoText} from '../../../config/allText';

//util
import moment from 'moment';
import escape from '../../../util/escape';

class DetailList extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onValid = this.onValid.bind(this);
        this.resultHandler = this.resultHandler.bind(this);
        this.onAddHandler = this.onAddHandler.bind(this);
    }

    componentDidMount() {
        const listName = this.props.listName;
        const result = getDetailList(listName);
        this.resultHandler(result, (json) => {
            this.props.detailActions.update(json);
        });
    }

    onChangeStatus(itemName, status) {
        const result = postSwitchState(this.props.listName, itemName, status);
        const todoListDetail = this.props.todoListDetail;
        this.resultHandler(result, json => {
            if (json.errno === 0) {
                todoListDetail.forEach((item) => {
                    if (item.item_name === itemName) {
                        item.finished = !status;
                    }
                });
                this.props.detailActions.update(todoListDetail);
            }
        });
    }

    onValid(inputText) {
        const todos = this.props.todoListDetail;
        const text = escape(inputText);

        const length = text.length;
        if (length <= 0) {
            return true;
        }

        const sameTitle = todos.some((item) => {
            return (item.item_name === text);
        });
        if (length > 30) {
            return createTodoText.textTooLong;
        }
        else if (sameTitle) {
            return createTodoText.titleSame;
        }
        else {
            return '';
        }
    }

    onAddHandler(itemName, date) {
        const result = postAddTodo(this.props.listName, itemName, date);
        const created = new Date();
        const newItem = {
            item_name: itemName,
            deadline: moment(date, 'YYYY-MM-DD HH:mm'),
            created,
            is_done: false
        };
        this.resultHandler(result, json => {
            if (json.errno === 0) {
                this.props.detailActions.add(newItem);
            }
        });
    }

    resultHandler(result,callback) {
        result.then(res => {
            return res.json();
        }).then(
            callback
        ).catch(ex => {
            if (__DEV__) {
                console.error('detail页数据报错, ', ex.message);
            }
        });
    }

    render() {
        return (
            <div>
                {
                    <DetailListComponent
                        detailList={this.props.todoListDetail}
                        onChangeStatus={this.onChangeStatus}
                        onValid={this.onValid}
                        onAddHandler = {this.onAddHandler}
                        listName={this.props.listName}/>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todoListDetail: state.todoListDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        detailActions: bindActionCreators(todoListDetailActionsFromOtherFile, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailList);