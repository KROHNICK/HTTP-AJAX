import React, { Component } from "react";
import axios from "axios";

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
  render() {
    return (
      <div className="friends-list">
        {this.state.friends.map(friend => (
          <FriendDetails key={friend.id} friend={friend} />
        ))}
      </div>
    );
  }
}
function FriendDetails({ friend }) {
  const { name, age, email } = friend;
  return (
    <div className="friend-card">
      <div className="friend-name">
        Name: <em>{name}</em>
      </div>
      <div className="friend-age">
        Age: <em>{age}</em>
      </div>
      <div className="friend-email">
        Email: <em>{email}</em>
      </div>
    </div>
  );
}
