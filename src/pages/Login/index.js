import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./Redux/login.redux";
import { useFormik } from "formik";

import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Login() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const {loading,error} = useSelector((state) => state.login);
  const dispatch = useDispatch();


  
  // step 1 : create initial values 
  const initialValues = {
    email: "",
    password: "",
  };

  // step 2 : create validation schema for form fields using yup
  const loginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Correct Email Addresss")
      .min(3, "Minimum 3 Letter")
      .required("Email Is Required"),
    password: Yup.string()
      .min(6, "Minimum 6 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password Is Required"),
  });

  // step 3 : Initialize Formik Form
  const formik = useFormik({
    initialValues,
    validationSchema: loginFormSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log("Form Submited");
      console.log(values);
      //Dispatch Signup via email
      dispatch(signIn(values));
    },
  });

  // const loginUser = () => {
  //   dispatch(signIn({ email: "arjit@gmail.com", pass: "123" }));
  // };

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}

      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {loading ? toast("Loading...") : null}
            {error ? toast({error}) : null}

            <div>
              <img
                className="h-28 w-auto mx-auto"
                src={require('../../gpm-logo-black.png')}
                alt="GP Mohammadi"
              />
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      name="email"
                      
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        {...formik.getFieldProps("email")}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className=" text-xs text-red-700">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        {...formik.getFieldProps("password")}

                        
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className=" text-xs text-red-700">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>


                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
