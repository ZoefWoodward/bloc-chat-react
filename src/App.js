import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase}/>
      </div>
    );
  }
}

export default App;
