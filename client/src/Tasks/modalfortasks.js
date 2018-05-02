import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import _ from 'lodash';


class Mods extends Component {

    render() {

        return (
            <React.Fragment>
                <List.Item style={{marginBottom: 10}}>{this.props.title}</List.Item>
            </React.Fragment>);
    }
}
export default Mods;
