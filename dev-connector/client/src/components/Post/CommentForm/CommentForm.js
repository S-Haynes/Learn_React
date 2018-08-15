import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../Input/TextAreaFieldGroup/TextAreaFieldGroup";
import { addComment } from "../../../store/actions/post";

class CommentForm extends Component {
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
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);

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
          <div className="card-header bg-info text-white">Add a comment...</div>
          <div className="card-body">
            <form onSubmit={e => this.onSubmitHandler(e)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
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

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
