import React, { Component } from 'react';
import './App.css';
import Start from './start.js';
import firebasedb from './../firebase/firebase';
class Tasks extends Component {

	constructor(props){
		super(props);
		this.state = {
			cards : [],
			boardId : ""
		}
	}


	componentWillMount(){

		const boardId = localStorage.getItem("boardId");

		firebasedb.child("/boards/"+boardId).on('value', (snapshot) => {
			let data = snapshot.val()
			if(data != null){
				
				this.setState({
					cards:data,
					boardId : boardId
				})
			}
			
		})
  }



  render() {

    return (
      <div className="Tasks">
        <Start data={this.state.cards} />
      </div>
    );
  }
}

export default Tasks;
