import React, { Component } from 'react';
import './../App.css';


class RoomList extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            rooms: [],
            newRoomName: ''
        };
        
        this.roomsRef = this.props.firebase.database().ref('rooms');
    };
    
        componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) });
        });

    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newRoomName) { return }
    }

    createRoom() {
        this.roomsRef.push({
            name: this.state.newRoomName
        });

    }
        
        render() {
            return (
                <section className= "room-list">
                    <div className= "list-names">
                        <ul>
                            {this.state.rooms.map( (room, index) => {
                            return (
                                <li key={index}> {room.name}</li>
                            )
                            })}
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input type="text" name="newroom" placeholder="New Room" value={this.state.newRoom} onChange={(e) => this.handleChange(e)} />
                            <button type="submit" onClick={() => this.createRoom()}>Create Room</button>
                        </form>
                        </ul>
                    </div>
                </section>
        );
        }

    }


export default RoomList;