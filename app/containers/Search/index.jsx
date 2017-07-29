import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActionsFromOtherFile from '../../actions/searchAction';

// components
import SearchComponent from '../../components/SearchComponent/index';

class Search extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <SearchComponent searchList={this.props.search}/>
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
        searchActions: bindActionCreators(searchActionsFromOtherFile, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);