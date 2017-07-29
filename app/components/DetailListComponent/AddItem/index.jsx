import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// config
import {createTodoText} from '../../../config/allText';

// css
import './style.less';

// ant-design
import { DatePicker, Button, Card, Input} from 'antd';

import escape from '../../../util/escape';

class AddItem extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.state = {
            text: '',
            date: null,
            errorText: ' ',
            dateString: ''
        };
    }

    inputChangeHandler(e) {
        const text = e.target.value;
        const errorText = this.props.onValid(text);
        this.setState({
            text,
            errorText
        });
    }

    dateChangeHandler(date, dateString) {
        this.setState({
            date,
            dateString
        });
    }

    onClickHandler() {
        const itemName = escape(this.state.text);
        const date = this.state.dateString;
        this.props.onAdd(itemName, date);
        this.setState({
            text: '',
            date: null
        });
    }

    disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
}

    render() {
        const inputProps = {
            placeholder: createTodoText.namePlaceholder,
            onChange: this.inputChangeHandler,
            value: this.state.text
        };
        const buttonProps = {
            type: "primary",
            onClick: this.onClickHandler,
            disabled: !!this.state.errorText || !this.state.date,
            style: {
                position: 'absolute',
                right: '0px'
            }
        };
        const datePickerProps = {
            placeholder: createTodoText.deadlinePlaceholder,
            onChange: this.dateChangeHandler,
            value: this.state.date,
            disabledDate: this.disabledDate
        };
        return (
            <div>
                <div id="add-item">
                    <Card>
                        <h1 style={{marginBottom: '5px'}}>{createTodoText.inputLabel}</h1>
                        <div style={{marginBottom: '10px'}}>
                            <Input {...inputProps}/>
                            <p style={{
                                visibility: this.state.errorText ? '' : 'hidden',
                                color: '#f04134'
                            }}>{this.state.errorText}</p>
                        </div>
                        <div className="container">
                            <DatePicker {...datePickerProps}/>
                            <Button {...buttonProps}>{createTodoText.buttonText}</Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AddItem;