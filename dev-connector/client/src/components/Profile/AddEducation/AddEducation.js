import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../../Input/TextFieldGroup/TextFieldGroup";
import TextAreaFieldGroup from "../../Input/TextAreaFieldGroup/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../../store/actions/profile";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "",
    errors: {},
    current: false,
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  onCheckHandler = e => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.current
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc. that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={e => this.onSubmitHandler(e)}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : null}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    id="current"
                    className="form-check-input"
                    checked={this.state.current}
                    onChange={e => this.onCheckHandler(e)}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(AddEducation);
