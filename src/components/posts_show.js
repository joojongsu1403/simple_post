import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost, deletePost, editPost } from '../actions/index';
import { connect } from 'react-redux';

class PostsShow extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            title: '',
            categories: '',
            content: '',
            isEdit: false
        };
    };
    
    componentDidMount(){
        this.props.fetchPost(this.props.match.params.id);
    };

    componentDidUpdate(){
        if(String(this.props.match.params.id) === String(this.props.post.id)) {
            this.setState({
                title: this.props.post.title,
                categories: this.props.post.categories,
                content: this.props.post.content
            });
        };
    };

    onEditClick = (event) => { // 서버에 patch에 관한 내용은 없나보다... 404 뜸..
        event.preventDefault();
        this.props.editPost(this.props.match.params.id, this.state);
        this.setState({
            isEdit: !this.state.isEdit
        });
    };

    onDeleteClick = () => {
        this.props.deletePost(this.props.match.params.id)
        .then(()=> {
            this.props.history.push("/");
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onToggleChange = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    };

    render() {
        
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        };

        const edit = (
            <form className="form-group" onSubmit={this.onEditClick}>
                <div style={{marginBottom: "10px"}} >
                    <input 
                        className="form-control"
                        name="title" 
                        value={this.state.title}
                        onChange={this.handleChange} />
                </div>
                
                <div style={{marginBottom: "10px"}}>
                    <input 
                        className="form-control" 
                        style={{marginBottom: "10px"}} 
                        name="categories" 
                        value={this.state.categories}
                        onChange={this.handleChange} />
                </div>
                   
                <div style={{marginBottom: "10px"}}>
                    <textarea 
                        className="form-control" 
                        style={{marginBottom: "10px"}} 
                        name="content" 
                        value={this.state.content}
                        onChange={this.handleChange} />
                </div>

                <button className="btn btn-primary">Edit Post</button>
            </form>
        );

        const show = (
            <>
                <h3 style={{marginBottom: "30px"}}>{post.title}</h3>
                <h6 style={{marginBottom: "30px"}}>{post.categories}</h6>
                <p style={{marginBottom: "30px"}}>{post.content}</p>
            </>
        );
        
        const view = this.state.isEdit ? edit : show;

        return (
            <div style={{width:"80%", margin: '0 auto'}}>
                <Link to="/">Back to Index</Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger pull-xs-right">
                    Delete Post
                </button>
                <button onClick={this.onToggleChange} className="btn btn-primary pull-xs-right" style={{ marginRight: '5px' }}>
                    {this.state.isEdit ? "Cancel" : "Edit Post"}
                </button>
                <div style={{marginTop: '50px'}}>{view}</div>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return { post: state.posts.post };
};

export default withRouter(
    connect( 
        mapStateToProps, 
        { fetchPost, deletePost, editPost }
    )(PostsShow)
);