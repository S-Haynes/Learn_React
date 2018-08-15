import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../Input/TextAreaFieldGroup/TextAreaFieldGroup";
import { addPost } from "../../../store/actions/post";

class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmitHandler = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);

    this.setState({ text: "" });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={e => this.onSubmitHandler(e)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
