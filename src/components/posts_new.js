import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { createPost } from '../actions/index';

class PostsNew extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            categories: '',
            content: ''
        };
    };

    onSubmit = props => {
        this.props.createPost(props)
        .then(() => {
           this.props.history.push("/");
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    renderInputField = ({
        input,
        type,
        label,
        placeholder,
        tagName,
        stateName,
        change,
        className,
        meta: { touched, error, invalid }
    }) => {

        const tag = ( tagName ) => {
            if ( tagName === 'input' ) {
                return <input 
                            {...input} 
                            className={className} 
                            type={type}
                            value={stateName}
                            placeholder={placeholder}
                            onChange={change} />
            } else if ( tagName === 'textarea' ) {
                return <textarea 
                            {...input}
                            className={className} 
                            value={stateName}
                            onChange={change} />
            };
        };

        return (
            <div className={`form-group ${touched && invalid ? 'has-danger' : ""}`}>
                <label>{label}</label>
                {tag(tagName)}
                {touched && error && <span>{error}</span>}
            </div>
        );
    };


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} style={{width:"80%", margin: '0 auto'}}>
                <h3>Create A New Post</h3>

                <Field
                    name="title"
                    label="title"
                    component={this.renderInputField}
                    placeholder="title"
                    tagName="input"
                    type="text"
                    stateName={this.state.title}
                    className="form-control"
                    change={this.handleChange} />
                    
                <Field
                    name="categories"
                    label="categories"
                    component={this.renderInputField}
                    placeholder="categories"
                    tagName="input"
                    type="text"
                    stateName={this.state.categories}
                    className="form-control"
                    change={this.handleChange} />

                <Field
                    name="content"
                    label="content"
                    component={this.renderInputField}
                    placeholder="content"
                    tagName="textarea"
                    type="text"
                    stateName={this.state.content}
                    className="form-control"
                    change={this.handleChange} />

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger" style={{marginLeft: '5px'}}>Cancel</Link>
            </form>
        );
    };
};

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    };

    if (!values.categories) {
        errors.categories = 'Enter categories';
    };

    if (!values.content) {
        errors.content = 'Enter some content';
    };

    return errors;
};

export default reduxForm({
    form: 'PostsNewForm',
    validate
})(withRouter(connect(null, { createPost })(PostsNew)));