import React from "react"
import Spinner from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./Logo.css"

export default function renderLoader({ text }) {
  return (
    <div style={{ marginTop: 400 }}>
      <Spinner type="Grid" color="black" height={100} width={100} />
      <h3>{text ? text : "Loading ..."}</h3>
    </div>
  )
}
