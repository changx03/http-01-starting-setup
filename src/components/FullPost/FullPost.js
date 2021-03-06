import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidUpdate(prevProps) {
    console.log('[FullPost] componentDidUpdate', prevProps.id, this.props.id);
    if (prevProps.id !== this.props.id) {
      axios
        .get(`/posts/${this.props.id}`)
        .then(response => {
          console.log('[FullPost]', response);
          this.setState({
            loadedPost: response.data,
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this._deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    } else if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    return post;
  }

  _deletePostHandler = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
      .then(res => {
        console.log(res);
      });
  }
}

export default FullPost;
