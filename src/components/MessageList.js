import React, { Component } from 'react';
import './../App.css';


class MessageList extends Component {
    constructor(props) {
    super(props)
        
        this.state = {
            messages: [],
            username: '',
            sentAt: '',
            content: '',
            roomId: '',
        };
        
        
        this.messagesRef = this.props.firebase.database().ref('messages');
      
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
            
        handleChange(e){
            this.setState({
                username: this.props.user,
                content: e.target.value,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.activeRoom});
            
        }

        handleSubmit(e){
            e.preventDefault();
            if (!this.state.content) {return}
        }
    
        
        deleteMessage(messageKey) {
            console.log('trying to delete message', messageKey)
            const message = this.props.firebase.database().ref('messages' + messageKey);
            message.remove()
            const remainMessages= this.state.messages
            .filter(message => message.key !== messageKey);
            this.setState({ messages: remainMessages});
        }
            
        
        createMessage(e){
            e.preventDefault();
            this.messagesRef.push({
                username: this.state.username,
                sentAt: this.state.sentAt,
                roomId: this.props.activeRoom,
                content: this.state.content
            
            });
        }

    
    render() {
        const activeRoom = this.props.activeRoom;
        const messageList = this.state.messages
        .filter(message => message.roomId === activeRoom)
        .map(message => {
            return <div className="current-message" key={message.key}>{message.username}: {message.content}
            <button id="deleteMessage" onClick={() => this.deleteMessage(message.key)}>Delete</button>
            </div>
        })
       
        return (
                <div className="chatroom-messages">
                    <div>{messageList}
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="text" name="newmessage" placeholder="New Message" value={this.state.content} 
                        onChange={(e) => this.handleChange(e)} />
                        <button type="submit" onClick={(e) => this.createMessage(e)}>Send</button>
                        </form>
                    </div>   
        );
    }
}

export default MessageList;