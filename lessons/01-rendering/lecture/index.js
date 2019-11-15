import "app/App.css"
import "app/index.css"
import "./styles.css"
import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { FaPlus, FaMinus, FaHome } from "react-icons/fa"

// Just JavaScript™
const Button = props => {
  return (
    <button
      onKeyDown={event => {
        if (event.key === "Enter") {
          props.onKeyboardClick("Enter")
        }
      }}
      onKeyUp={event => {
        if (event.key === " ") {
          props.onKeyboardClick("Space")
        }
      }}
      className="icon_button cta"
    >
      {props.children}
    </button>
  )
}

const domElement = document.getElementById("root")
ReactDOM.render(
  <div>
    <Button onKeyboardClick={which => alert(which)}>
      <FaMinus />{" "}
      <span style={{ fontWeight: "bold" }}>Subtract</span>
    </Button>
    <Button>
      <FaPlus />{" "}
      <span style={{ fontWeight: "bold" }}>Add</span>
    </Button>
  </div>,
  domElement
)
