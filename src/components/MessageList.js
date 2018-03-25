import React, { Component } from 'react';
import './../App.css';


class MessageList extends Component {
    constructor(props) {
    super(props)
        
        this.state = {
             messages: [{
            username: '',
            sentAt: '',
            content: '',
            roomId: '',}]
        };
        
        
        this.messagesRef = this.props.firebase.database().ref('Messages');
        this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    };
    
    
        componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat(message),
            })
        });

    }
    
    render() {
        const activeRoom = this.props.activeRoom;
        const messageList = this.state.messages
        .filter(message => message.roomId === activeRoom)
        .map(message => {
            return <li className="current-message"key={message.key}>{message.content}</li>
        })
        
        return (
            <div className="chatroom-messages">
                <ul>{messageList}</ul>
            </div>
        );


    }

}

export default MessageList;