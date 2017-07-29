import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import {Input} from 'antd';

import {searchText} from '../../config/allText';

import './style.less';

const Search = Input.Search;

class Header extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.state = {
            keyword: ''
        };
    }

    onChangeHandler(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    onSearchHandler(value) {
        this.props.searchHandler(value);
        this.setState({
            keyword: ''
        });
    }

    render() {
        const searchProps = {
            placeholder: searchText.searchPlaceholder,
            style: {
                width: 200,
                position: 'absolute',
                right: '10px',
                top: '10px',
            },
            onSearch: this.onSearchHandler,
            value: this.state.keyword,
            onChange: this.onChangeHandler
        };
        return (
            <div id="common-header">
                <Link to="/">
                    <h2>{this.props.title}</h2>
                </Link>
                <Search {...searchProps}/>
            </div>
        );
    }
}

export default Header;