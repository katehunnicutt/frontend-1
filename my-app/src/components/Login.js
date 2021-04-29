import * as yup from "yup";
import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import LoginSchema from "./LoginSchema";
import axios from 'axios'


const initialFormValues = {
  email: "",
  password: "",
};

const initialFormErrors = {
  email: "",
  password: "",
};



const Login = (props) => {

  const history = useHistory()

  const [loginValues, setLoginValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  //still need to disable with if statement but v sleepy
  const { push } = useHistory()
  

  const handleChanges = e => {
    yup.reach(LoginSchema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: ''
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: err.errors[0]
        })
      })
      setLoginValues({
        ...loginValues,
        [e.target.name]: e.target.value
      })
  }
  const submitForm = (e) => {
    e.preventDefault()
    axios
    .post("https://water-my-plants-tt14.herokuapp.com/api/auth/login", loginValues)
    .then((res) => {
      console.log("login resp", res, res.data)
      //setLoginValues(initialFormValues)
      localStorage.setItem("token", res.data.token)
      // localStorage.setItem("userId", res.data.user.user_id )
      history.push("/")
      
      }
      
      )
    .catch(error => console.log({error}))
  }

return(
  <StyledLogin>
  <StyledLoginForm className="loginformcontainer" 
  onSubmit={submitForm}>
      <h2>Login</h2>
      <div>
        <p>
          <label>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={loginValues.email}
              onChange={handleChanges}
            />
          </label>
          {/* {formErrors.email ? <p>{formErrors.email.message}</p> : null} */}
        </p>
        <p>
          <label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={loginValues.password}
              onChange={handleChanges}
            />
          </label>
          {/* {formErrors.password ? <p>{formErrors.password.message}</p> : null} */}

        </p>
      </div>
      <div className='bottom'>
        <button type="submit">Log In</button>
        <div className='btn-login'>
              <h4>Don't have a account? </h4>
              <button className='login' onClick={() => {push('/signup')}}>Sign Up</button>
          </div>

        {/* {formErrors && <div style={{ color: "red" }}>{formErrors}</div>} */}
      </div>
    </StyledLoginForm>
  </StyledLogin>
)
}

//styling for loginform 
  const StyledLogin = styled.div`
    background: #E5E5E5;
  `
const StyledLoginForm = styled.form`
    position: absolute;
    width: 570px;
    height: 305px;
    left: 435px;
    top: 265px;
    padding: 40px;
    background: #FFFFFF;
    box-shadow: 0px 30px 60px -40px rgba(130, 70, 0, 0.5);

    h2{
      width: 490px;
      height: 37px;
      left: 475px;
      top: 305px;
      font-family: PT Serif;
      font-style: normal;
      font-weight: bold;
      font-size: 28px;
      line-height: 37px;
      color: #224229;
    }

    p{
      width: 100%;
      height: 23px;
      left: 475px;
      top: 362px;
      font-family: PT Serif;
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 23px;
      color: #224229;
      border-bottom: 3px solid green;

    }



  button{
    width: 232px;
    height: 54px;
    left: 475px;
    top: 476px;
    margin-top: 20px;
    background: #548A60;
    font-family: PT Serif;
    font-style: normal;
    font-weight: bold;
    color: white;
    font-size: 17px;
    line-height: 23px;
    text-align: center;
    text-transform: uppercase;
  }

  & h4{
    width: 500px;
    margin-top: 9px;
  }

  & .btn-login{
    display: flex;
    margin-top: 40px;
    width: 245px;
    height: 16px;
    left: 720px;
    top: 510px;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    color: #B1B7B3;
  }
  & .bottom{
    display: flex;
    justify-content: center;
  }
  & .login{
    background: none;
    border: none;
    padding-bottom: 80px;
    margin-top: 10px;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    color: #B1B7B3;

    &:hover{
      color: blue;
    }
  }
span{
    color: ${pr => pr.theme.errorColor};
    white-space: ${pr => pr.theme.whiteSpace};
}
`
export default Login;

