import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
        <nav>
        <h2 className="app-title"> Bloc Chat </h2>
        <User className="greeting" firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />
        </nav>
        <aside className="list-rooms">
          <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
        </aside>
        <div>
          <main className="active-chat-room">
            <h2>{this.state.activeRoom.name}</h2>

            {displayMessages ?

            (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
            : (null)
            }
            
            
          </main>
        </div>
      </div>
    );
  }
}

export default App;