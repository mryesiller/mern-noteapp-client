import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import authService from "../../services/auth.service"

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6, "Password must be min 6 character")
    .max(6, "Password must be max 6 character"),
})

function Login() {
  const [loginMessage, setLoginMessage] = useState("")
  const [status, setStatus] = useState(true)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      authService
        .login(values.email, values.password)
        .then((response) => {
          setStatus(true)
          setLoginMessage(response.message)
          setTimeout(() => {
            window.location.href = "http://localhost:8081/dashboard"
          }, 1000)
        })
        .catch((err) => {
          setStatus(false)
          setLoginMessage(err.response.data.message)
        })
      resetForm()
    },
  })

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>LOGIN</h2>
        <form onSubmit={formik.handleSubmit}>
          {loginMessage && (
            <div className="form-group">
              {status ? (
                <div className="alert alert-success" role="alert">
                  {loginMessage}
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  {loginMessage}
                </div>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="text"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback d-block">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder=""
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback d-block">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block mt-3" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
