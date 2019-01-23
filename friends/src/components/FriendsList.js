import React, { Component } from "react";
import axios from "axios";
import FriendForm from "./FriendForm";

export default class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  handleDelete = e => {
    axios
      .delete("http://localhost:5000/friends:id", {
        id: Number(this.state.id),
        name: this.state.name,
        age: Number(this.state.age),
        email: this.state.email
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  createFriend = data => {
    this.setState({ friends: data });
  };

  render() {
    return (
      <div className="friends-list">
        {this.state.friends.map(friend => (
          <div className="friend-card">
            <h2>{friend.name}</h2>
            <p>{friend.age}</p>
            <p>{friend.email}</p>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        ))}
        <FriendForm createFriend={this.createFriend} />
      </div>
    );
  }
}
