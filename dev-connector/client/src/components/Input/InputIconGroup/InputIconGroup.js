import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputIconGroup = props => {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={props.icon} />
          </span>
        </div>
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": props.error
          })}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
        />
        {props.error && <div className={"invalid-feedback"}>{props.error}</div>}
      </div>
    </div>
  );
};

InputIconGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired
};

InputIconGroup.defaultProps = {
  type: "text"
};

export default InputIconGroup;
