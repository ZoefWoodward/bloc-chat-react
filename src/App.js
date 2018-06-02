import React, { Component } from 'react';
import './App.css';
import './components/User.css';
import './components/RoomList.css';
import './components/MessageList.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import Ionicon from 'react-ionicons';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj_Vb5vHfaMNISJwP6KgQ-mMfYJuTpdww",
    authDomain: "bloc-chat-72d78.firebaseapp.com",
    databaseURL: "https://bloc-chat-72d78.firebaseio.com",
    projectId: "bloc-chat-72d78",
    storageBucket: "bloc-chat-72d78.appspot.com",
    messagingSenderId: "271559678881"
  };
  firebase.initializeApp(config);

class App extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            activeRoom: '',
            user: null
            
        };
        
    }
    
    setActiveRoom(room) {
        this.setState({ activeRoom: room })  
    }
    
    setUser(user){
        this.setState({user: user})
        console.log(user);
    }
    
    
render() {
    
    const displayMessages = this.state.activeRoom;
    const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;
    
    
    return (
      <div className="App">
        <div className="column-left">
            <nav>
                <h2 className="app-title"> <b>chatter</b>box <Ionicon icon="ios-people" fontSize="28px" color="#6F8FD9" /></h2>
                <User className="greeting" firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />
            </nav>
        <aside className="list-rooms">
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
        </aside>
        </div>
        <div className="column-right">
          <main className="active-chatroom">
            <h2>{this.state.activeRoom.name}</h2>
            
            {displayMessages ?

            (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={activeUser}/>)
            : (null)
            }
            
          </main>
        </div>
      </div>
    );
  }
}

export default App;