import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router-dom';

class Posts_index extends PureComponent {
    
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPost() {
        return this.props.posts.map( post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`posts/${post.id}`}>
                        <span className="pull-xs-right">{post.categories}</span>
                        <strong>{post.title}</strong>
                    </Link>
                </li>
            );
        });
    };

    render() {
        return (
            <div style={{width:"80%", margin: '0 auto'}}>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary">Add a Post</Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPost()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts.all };
}


export default connect(mapStateToProps, { fetchPosts })(Posts_index);