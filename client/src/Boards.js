import { Button, Card, Image } from 'semantic-ui-react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Redirect, Route, Router } from "react-router";
import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import Tasks from './Tasks/App';
import { Link } from "react-router-dom";

class Boards extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        localStorage.setItem("boardId",this.props.data.boardId)
        this.props.history.push('/Tasks')
    }


    render() {
        return (
            <React.Fragment>
                <Card.Group>
                        <Card style={{ margin: 10 }} onClick={this.handleClick}>
                            <Card.Header>

                            </Card.Header>
                            <Card.Content >
                                {this.props.data.boardName}
                                <Card.Meta>
                                    Date: {this.props.data.createdOn}
                                </Card.Meta>
                                <Card.Description>
                                    Created By : {this.props.data.createdBy}
                                </Card.Description>
                            </Card.Content >
                           
                        </Card>
                </Card.Group>
            </React.Fragment>
        );
    }
}

export default Boards;
