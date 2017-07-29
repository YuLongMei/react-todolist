import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// components
import ListItem from './ListItem/index';
import AddItem from './AddItem/index';
import ErrorPage from '../../components/ErrorPage/index';

// css
import './style.less';

//util
import showFormatDate from '../../util/formatDate';

// text
import {todoText} from '../../config/allText';

class DetailListComponent extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const detailList = this.props.detailList;
        return (
            <div id="detail-list">
                <h1 style={{fontSize: '18px'}}>
                    {this.props.listName}
                </h1>
                <AddItem
                    onValid={this.props.onValid}
                    onAdd = {this.props.onAddHandler}
                />
                {
                    detailList.length ?
                        detailList.map((item, index) => {

                            const created = showFormatDate(item.created);
                            const deadline = showFormatDate(
                                item.deadline);
                            const ListItemProps = {
                                title: item.item_name,
                                created,
                                deadline,
                                is_done: item.finished,
                                onChangeStatusHandler: this.props.onChangeStatus
                            };
                            return (
                                <ListItem key={index} {...ListItemProps}/>
                            );
                        }) :
                        <ErrorPage title={todoText.noTodoItem}/>
                }
            </div>
        );
    }
}

export default DetailListComponent;