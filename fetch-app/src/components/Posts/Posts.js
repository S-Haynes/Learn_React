import React, { Component } from 'react';
import Post from './Post/Post'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
   fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(res => {
      return res.slice(0, 10)})
    .then(res => this.setState({posts: res})) 
  }

  deletePostHandler = (id) => {
    let posts = [...this.state.posts]
    
    const filteredPosts = posts.filter(posts => {
      return posts.id !== id
    })

    this.setState({ posts: filteredPosts })
  }

  render () {
    const posts = this.state.posts.map((post, i) => {
      return <Post delete={this.deletePostHandler} id={post.id} key={post.title + i} title={post.title} body={post.body}/>
    })
    return (
    <div>
     {posts}
    </div>
    )
  }      
}

export default Posts;