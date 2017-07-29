import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {getSearchList} from "../fetch/search/search";
import {hashHistory} from 'react-router'

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchListActionsFromOtherFile from '../actions/searchAction';

import Header from '../components/Header/index.jsx';

class App extends React.Component {

    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(value) {
        const keyword = value.trim();
        const result = getSearchList(keyword);
        result.then(res => {
            return res.json();
        }).then(json => {
            this.props.searchActions.update(json);
            hashHistory.push('/search/'+encodeURIComponent(value));
        }).catch(ex => {
            if (__DEV__) {
                console.error('search页数据报错, ', ex.message);
            }
        });
    }

    render() {
        return (
          <div>
              <Header title="ToDoList" searchHandler={this.searchHandler}/>
              {
                  this.props.children
              }
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchListActionsFromOtherFile, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);