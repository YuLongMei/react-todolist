import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// config
import {todoText} from '../../../config/allText';

// ant-design
import {Card, Switch} from 'antd';

// css
import './style.less';

class ListItem extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            isChecked: !this.props.is_done
        };
    }

    onChangeHandler(e) {
        const itemName = this.props.title;
        this.props.onChangeStatusHandler(itemName, e);
    }

    render() {
        const {title, created, deadline, is_done} = this.props;
        const switchProps = {
            className: 'ant-switch-checked',
            style: {
                position: 'absolute',
                right: '25px',
                top: '9px'
            },
            checkedChildren: todoText.isDoneChecked,
            unCheckedChildren: todoText.isDoneUnchecked,
            checked: !this.props.is_done,
            onChange: this.onChangeHandler
        };
        return (
            <div id="list-item">
                <Card title={title}>
                    <div className="content">
                        <div>
                            <p>{todoText.deadlineText}{deadline}</p>
                            <p>{todoText.createdAtText}{created}</p>
                        </div>
                        <Switch {...switchProps}/>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ListItem;