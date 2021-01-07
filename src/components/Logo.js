import React from "react"
import "./Logo.css"

export default function Logo({ size, color, background }) {
  return (
    <p>
      <span className="logo1" style={{ fontSize: size, color, background }}>
        DATA
      </span>
      <span className="logo2" style={{ fontSize: size, color }}>
        {" "}
        SCOUT
      </span>{" "}
    </p>
  )
}
