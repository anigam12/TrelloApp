import React, { Component } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { Button, Card, Image, Modal, List, Popup } from 'semantic-ui-react'
import './App.css';
import { Form, TextArea } from 'semantic-ui-react';
import TrelloCards from './trellocards';
import firebasedb from './firebase/firebase';


let newName = ""
let newDesc = ""
class Start extends Component {


    constructor(props){
        super(props);
        this.state = {
            open: false,
            cardName: "",
            cardDesc: "",
            cards : [],
            boardId: ""
        };
        this.handleChangeForName = this.handleChangeForName.bind(this);
        this.handleChangeForDesc = this.handleChangeForDesc.bind(this);
        this.close = this.close.bind(this);
    }

    
    show = () => this.setState({ open: true })
    

    close() {

        const indexVal = this.state.cards ? this.state.cards.length: 0;
        const boardId = localStorage.getItem("boardId");

        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth();
        const y = date.getFullYear();
        const time = `${d}/${m}/${y}`;
        firebasedb.child('boards/' + boardId + '/cards/' + indexVal).set({
            createdOn: time,
            description: newDesc,
            name:newName,
            taskName:[]

        });

        this.setState({ open: false });
    }

    componentWillMount(){

        const boardId = localStorage.getItem("boardId");
        firebasedb.child("/boards/"+boardId+"/cards").on('value', (snapshot) => {
            let data = snapshot.val()
            if(data != null){

                this.setState({
                    cards:data,
                    boardId: boardId,
                })
            }
            
        })
  }

     handleChangeForName(event) {
        newName = event.target.value
        console.log(newName)
    
  }
    handleChangeForDesc(event){
        newDesc = event.target.value
        console.log(newName)
  }
    render() {
        const { open } = this.state;
        return (
            <div>
                <Segment>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        TRELLO
            </Header>
                    <Header as='h3' textAlign='right'>
                        <Icon.Group size='large' onClick={this.show}>
                            <Icon name='plus' />
                        </Icon.Group>
                        <Modal style={{ margin: 'auto', marginTop: 'auto' }} open={open} onClose={this.close}>
                            <Modal.Header>Add a new Card</Modal.Header>
                            <Modal.Content scrolling>
                                <Modal.Description>
                                    <Header>Title of the Card</Header>
                                    <p>Note: You cant change the title of this Card once created</p>
                                    <Form>
                                        <TextArea autoHeight placeholder='Add a Card' onChange={this.handleChangeForName} />
                                        <TextArea autoHeight  placeholder='Enter The Description' onChange={this.handleChangeForDesc} />
                                    </Form>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button primary onClick={this.close}>
                                    Proceed <Icon name='right chevron' />
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        <Popup
                            trigger={<Icon.Group size='large'>
                                <Icon name='info circle' />
                            </Icon.Group>}
                            content='Note: Click on + button to add a new Card and in the card click Add button to add tasks to it, Enjoy!!'
                        />

                        <Icon.Group size='large'>
                            <Icon name='bell outline' />
                        </Icon.Group>
                    </Header>
                </Segment>
                <TrelloCards cards={this.state.cards} boardId={this.state.boardId} />
            </div>
        );
    }
}

export default Start;
