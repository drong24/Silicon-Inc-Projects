import React from "react";
import { login } from "./api";
import { useUser } from "./App";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';


export default function Login() {

    const navigate = useNavigate();
    const { user } = useUser();
    const { setUser } = useUser();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    return (
        
        <div className="login_page">
            <h2>Login</h2>
            <div className="error-message input-feedback">
                {error ? "Invalid username or password." : ""}
            </div>
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values) => {
                try {
                    setLoading(true);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    console.log(values);
                    setUser(await login(values));
                    setLoading(false);
                    navigate("/");
                }
                catch(e) {
                    console.log("Login Failed: " + e);
                    setError(true);
                }
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username Required"),
              password: Yup.string().required("Password Required"),
            })}
                  >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form className="login_form" onSubmit={handleSubmit}>
                  <input
                    id="username"
                    placeholder="Username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.username && touched.username
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.username && touched.username && (
                    <div className="input-feedback">{errors.username}</div>
                  )}
                  <br />
                  <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <br />
                  {
                  loading ? 
                    <button className="submit_button" type="submit" disabled>
                      <CircularProgress/>
                    </button> : 
                    <button className="submit_button" type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  }
                  </form>
              );
            }}
                  </Formik>
        </div>
    );
}