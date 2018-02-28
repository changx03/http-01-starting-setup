import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedId: null,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({
          ...post,
          author: 'Max',
        }));
        this.setState({
          posts: updatedPosts,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    const posts = this.state.posts.map(post => (
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        onClick={() => this._onPostClicked(post.id)}
      />
    ));

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          {
            this.state.error ?
              <div style={{ textAlign: 'center' }}><p>Something went wrong!</p></div>
              : <FullPost id={this.state.selectedId} />
          }
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }

  _onPostClicked = id => {
    this.setState({
      selectedId: id,
    })
  };
}

export default Blog;
