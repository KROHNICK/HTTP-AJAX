import React, { Component } from "react";
import axios from "axios";

export default class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {
        name: String,
        age: Number(),
        email: String
      }
    };
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", {
        name: this.state.name,
        age: Number(this.state.age),
        email: this.state.email
      })
      .then(response => {
        console.log(response);
        this.props.createFriend(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    e.target.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChanges}
          placeholder="Name"
          name="name"
          required
        />
        <input
          type="text"
          onChange={this.handleChanges}
          placeholder="Age"
          name="age"
          required
        />
        <input
          type="text"
          onChange={this.handleChanges}
          placeholder="Email"
          name="email"
          required
        />
        <button onSubmit={this.handleSubmit}>Update</button>
      </form>
    );
  }
}
