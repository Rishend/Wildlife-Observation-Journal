import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import UseAppContext from "../AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { setLoggedin } = UseAppContext();

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
        });

        const data = await res.json();

        console.log(data);

        sessionStorage.setItem("user", JSON.stringify(data));

        setLoggedin(true);

        navigate('/journal');

      } else if (res.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email or password is incorrect",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    },
  });

  return (
    <motion.div
        initial={{x: '100%'}}
        animate={{x: 0}}
        exit={{x: '-100%'}}
        transition={{duration: 0.3}}
      
      className="py-5 vh-100 bg-body-secondary container-fluid"
    >
      <div className="col-md-3 mx-auto">
        <div className="card">
          <div className="card-body">
            <form onSubmit={loginForm.handleSubmit}>
              <h2 className="text-center md-5 font-size:20px">Login </h2>

              <label>Email</label>
              <input
                id="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                type="email"
                className="form-control mb-4"
              />
              <label>Password</label>
              <input
                id="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                type="password"
                className="form-control mb-4"
              />

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;