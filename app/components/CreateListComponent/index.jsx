import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// config
import {createListText} from '../../config/allText';

// component
import { Input, Button } from 'antd';

// css
import './style.less';

// util
import escape from '../../util/escape';

class CreateListComponent extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.onCreateHandler = this.onCreateHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            listTitle: '',
            errorText: ' '
        };
    }

    onCreateHandler() {
        this.props.onClickHandler(escape(this.state.listTitle));
        this.setState({
            listTitle: '',
            errorText: ' '
        });
    }

    onChangeHandler(e) {
        const inputText = e.target.value;
        const errorText = this.props.valid(inputText);
        this.setState({
            listTitle: inputText,
            errorText
        });
    }

    render() {
        const inputProps = {
            size: 'large',
            value: this.state.listTitle,
            placeholder: createListText.inputPlaceholder,
            style: {
                width: '82%',
                marginRight: '10px'
            },
            onChange: this.onChangeHandler,
        };

        const buttonProps = {
            type: "primary",
            onClick: this.onCreateHandler,
            disabled: !!this.state.errorText
        };

        return (
            <div id="create-list">
                <label>{createListText.inputLabel}</label>
                <Input {...inputProps}/>
                <Button {...buttonProps}>{createListText.buttonText}</Button>
                <p style={{
                    visibility: this.state.errorText ? '' : 'hidden',
                    color: '#f04134'
                }}>{this.state.errorText}</p>
            </div>
        );
    }
}

export default CreateListComponent;