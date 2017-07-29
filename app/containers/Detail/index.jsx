import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DetailList from './subPage/DetailList';

class Detail extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let listName = this.props.params.listname;
        return (
            <div>
                <DetailList listName={listName}/>
            </div>
        );
    }
}

export default Detail;