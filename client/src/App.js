import React, { Component } from 'react';
import { Header, Icon, Segment} from 'semantic-ui-react';
import { Button, Card, Image, Modal, List, Input } from 'semantic-ui-react'
import './App.css';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Boards from './Boards';
import firebasedb from './firebase/firebase';
import {logout} from "./Login/src/helpers/auth";
const appTokenKey = "appToken";

const userNameId = localStorage.getItem("emailInfo");

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      boards: [],
      boardName: "",
      open: false,
      dataId:null

    };
    

      this.handleLogout = this.handleLogout.bind(this);
      this.close = this.close.bind(this);
  }

  show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
  handleLogout() {
      logout().then(function () {
          localStorage.removeItem("emailInfo");
          localStorage.removeItem(appTokenKey);
          this.props.history.push("/login");
          console.log("user signed out from firebase");
      }.bind(this));

  }
  componentDidMount(){
    firebasedb.child("/users/"+userNameId+"/boards").on('value', (snapshot) => {
      let data = snapshot.val()
      if(data != null){
        let arr = Object.keys(data).map(function(k) { return data[k] });
        this.setState({
          boards:arr,
        })
      }
    })
  }

  addBoard = ()=>{
    this.close();
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const time = `${d}/${m}/${y}`;


    let tryid = firebasedb.child('/boards').push({
      "boardName":this.state.boardName,
      "createdBy":localStorage.getItem("displayName"),
      "members":[],
      "createdOn":time,
      "cards":[]
    })
    let dataId = tryid.path.pieces_[1];
    this.setState({dataid:dataId});

    firebasedb.child("/users/"+userNameId+"/boards/").push({
      "boardId": dataId,
      "boardName":this.state.boardName,
      "createdBy":localStorage.getItem("displayName"),
      "createdOn":time
    });

  }
    handleChange =(e)=>{
      this.setState({boardName:e.target.value})
    }

  render() {
    const { boards } = this.state;
    return (
      <div className="App">
        <div>
          <Segment>
            <Header as='h4' icon textAlign='center' style={{height:20, marginTop:-5}}>

              <Icon name='users' circular />
                TRELLO
            </Header>
            <Header as='h3' style={{height:20, marginTop:-5}}>
   <Image circular src={localStorage.getItem("photoURL")} />
   {' '}{localStorage.getItem("displayName")}
 </Header>


            <Header as='h4' textAlign='right' style={{height:30, marginTop:-5}}>
            <Modal style={{margin:'auto',marginTop:'auto'}} open= {this.state.open} trigger={<Icon.Group size='large' onClick={this.show}>
                <Icon name='plus' />
              </Icon.Group>}>
                <Modal.Header>Add a new Board</Modal.Header>
                <Modal.Content scrolling>
                    <Modal.Description>
                        <Header>Title of the Board</Header>
                        <Input onChange={this.handleChange} value={this.state.boardname}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.addBoard} >
                        Proceed <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
            </Modal>
              <Icon.Group size='large'>
                <Icon name='info circle' />
              </Icon.Group>
              <Icon.Group size='large'>
                <Icon name='bell outline' />
              </Icon.Group>
              <Button color='black' onClick={this.handleLogout}>
<Icon name='sign out' /> Sign Out
</Button>
            </Header>
          </Segment>
            <Card.Group style={{margin: 'auto'}}>
            {/* <SortableList items={this.state.boards} onSortEnd={this.onSortEnd} /> */}
            {this.state.boards ? this.state.boards.map((items,index) => (
             <Boards index={index} data = {items} history = {this.props.history} />
           ))   : ""}
              </Card.Group>
        </div>


        </div>
        );
      }
    }

    export default App;
