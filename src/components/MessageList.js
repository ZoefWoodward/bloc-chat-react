import React, { Component } from 'react';
import './../App.css';
import Ionicon from 'react-ionicons';
import Time from 'react-time';
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
            this.scrollToBottom();
            
        }
    
        componentDidUpdate() {
            this.scrollToBottom();
        }
    
        scrollToBottom = () => {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
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
                content: this.state.content,
            
            });
        }

    
    render() {
        const activeRoom = this.props.activeRoom;
        const messageList = this.state.messages.filter(message => message.roomId === activeRoom).map(message => {
            return <div className="message-container">
                <div className="chat-bubble"> 
                    <button id="deleteMessage" onClick={() => this.deleteMessage(message.key)}>
                        <Ionicon icon="ios-close" fontSize="15px" color="dimgray" /></button>
                            <div className="current-message" key={message.key}>{message.content}
            
                    <p className="username">{message.username}</p>
                </div>
            </div>
                    <p className="wasDate"><Time value={message.sentAt} titleFormat="YYYY/MM/DD HH:mm" relative/>
                </p>
            </div>
        })
       
        return (
                <div className="chatroom-messages">
                    <div>{messageList}
                    </div>
                    <form id="message-input" onSubmit={(e) => this.handleSubmit(e)}>
            
                        <input type="text" name="newmessage" placeholder="Write your message here..." value={this.state.content} 
                        onChange={(e) => this.handleChange(e)} />
                
                        <button id="ios-send" type="submit" onClick={(e) => this.createMessage(e)}><Ionicon icon="ios-send" color="dimgray" fontSize="40px" padding="10px"/></button>
                        </form>

                    <div style={{ float: "left", clear: "both" }}
                    ref={(el) => {this.messagesEnd = el; }}></div>
                    </div>  
        );

    }
}

export default MessageList;