import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import {searchText, todoText} from '../../config/allText';

// css
import './style.less';

// ant-design
import {Collapse, Card} from 'antd';
const Panel = Collapse.Panel;

// util
import showFormatDate from '../../util/formatDate';

class SearchComponent extends React.Component {
    constructor(...arg) {
        super(...arg);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {list, item} = this.props.searchList;
        const listNum = list && list.length ? list.length : 0;
        const itemNum = item && item.length ? item.length : 0;
        const commonStyle = {
            background: '#fff',
            borderRadius: 4,
            marginBottom: 50,
        };
        const listPanel = {
            header: listNum ?
                'ToDoリストが' + listNum + '件見つかりました' :
                '対象のToDoリストは見つかりません',
            key: 1,
            style: commonStyle,
            disabled: listNum ? false : true
        };
        const itemPanel = {
            header: itemNum ?
                'ToDoが' + itemNum + '件見つかりました' :
                '対象のToDoは見つかりません',
            key: 2,
            style: commonStyle,
            disabled: itemNum ? false : true
        };

        return (
            <div id="search">
                <Collapse bordered={false}>
                    <Panel {...itemPanel}>
                        {
                            item && item.map((item, index) => {
                                const deadline = showFormatDate(item.deadline);
                                const created = showFormatDate(item.created);
                                return (
                                    <Link to={'/detail/' + item.list_name} key={index}>
                                        <Card key={index}
                                              style={{
                                                  marginBottom: index !== itemNum - 1
                                                      ? '5px' : '0'
                                              }}
                                              className="item-card">
                                            <h1>{item.item_name}</h1>
                                            <div className="content">
                                                <p className="list-name">
                                                    {searchText.listText}{item.list_name}
                                                </p>
                                                <div className="date-wrapper clear-fix">
                                                    <p>
                                                        {todoText.deadlineText}{deadline}
                                                    </p>
                                                    <p>
                                                        {todoText.createdAtText}{created}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })
                        }
                    </Panel>
                    <Panel {...listPanel}>
                        {
                            list && list.map((item, index) => {
                                const created = showFormatDate(item.created);
                                return (
                                    <Link to={'/detail/' + item.list_name} key={index}>
                                        <Card key={index}
                                              style={{
                                                 marginBottom: index !== itemNum - 1
                                                     ? '5px' : '0'
                                              }}
                                              className="list-card">
                                            <h1>{item.list_name}</h1>
                                            <p className="list-created">
                                                {todoText.createdAtText}{created}
                                            </p>
                                        </Card>
                                    </Link>
                                );
                            })
                        }
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default SearchComponent;