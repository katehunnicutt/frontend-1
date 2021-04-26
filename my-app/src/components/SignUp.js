import * as yup from "yup";

import React, { useEffect, useState } from "react";

import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";
import { signupUser } from "../actions/index";
import SignUpSchema from "./SignUpSchema";
import { useHistory } from "react-router-dom";

// import axios from 'axios'

// import axios from 'axios'
// import { useHistory } from 'react-router-dom';

const initialFormValues = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};
const initialDisabled = true;

function SignUp({ error, signupUser }) {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const formSubmit = () => {
    const signupSubmit = {
      username: formValues.username.trim(),
      firstname: formValues.firstname.trim(),
      lastname: formValues.lastname.trim(),
      email: formValues.email.trim(),
      password: formValues.firstname.trim(),
    };
    // Post request towards the server
    signupUser(signupSubmit);
    if (error) {
      setFormErrors();
      setFormErrors({ ...formErrors, [error.name]: error.message });
    } else {
      history.push("/login");
    }
  };

  const inputChange = (name, value) => {
    // Validating forum first then pluggin in the values
    yup
      .reach(SignUpSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });

    // Plugging in values into FORMVALUES
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    SignUpSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="signup">
      <h1></h1>

      <SignUpForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  );
}

const mapStateToProps = ({ userReducer }) => {
  return {
    error: userReducer.error,
  };
};

export default connect(mapStateToProps, { signupUser })(SignUp);