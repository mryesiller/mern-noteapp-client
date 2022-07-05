import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import authService from "../../services/auth.service"

let schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6, "Password must be min 6 character")
    .max(6, "Password must be max 6 character"),
})

function Register() {
  const [regiterMessage, setRegisterMessage] = useState("")
  const [status, setStatus] = useState(true)
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      authService
        .register(values.username, values.email, values.password)
        .then((response) => {
          console.log(response)
          setStatus(true)
          setRegisterMessage(response.data.message)
          setTimeout(() => {
            window.location.href = "http://localhost:8081/login"
          }, 1000)
        })
        .catch((err) => {
          setStatus(false)
          setRegisterMessage(err.response.data.message)
        })

      resetForm()
    },
  })

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>REGISTER</h2>
        <form onSubmit={formik.handleSubmit}>
          {regiterMessage && (
            <div className="form-group">
              {status ? (
                <div className="alert alert-success" role="alert">
                  {regiterMessage}
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  {regiterMessage}
                </div>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="invalid-feedback d-block">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="text"
              placeholder=""
              onChange={formik.handleChange}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
