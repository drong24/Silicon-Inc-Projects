import React from "react";
import { login } from "./api";
import { useUser } from "./App";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from 'react-router';


export default function Login() {

    const navigate = useNavigate();
    const { setUser } = useUser();
    const [error, setError] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState(); 

    const validationSchema = Yup.object({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleSubmit = async (e, values) => {
        
        setUser(login(values));
        //window.location.reload();
    }

    return (
        
        <div>
            <h2>Login</h2>
            <div className="error-message input-feedback">
                {error ? "Invalid username or password." : ""}
            </div>
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values) => {
                try {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    console.log(values);
                    setUser(await login(values));
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
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <input
                    id="username"
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
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
                  <br />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                  </form>
              );
            }}
                  </Formik>
        </div>
    );
}