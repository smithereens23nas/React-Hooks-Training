import "app/index.css"
import "app/App.css"
import "./styles.css"
import React from "react"
import ReactDOM from "react-dom"
import { FaMinus, FaPlus } from "react-icons/fa"
import App from "app/App"

function Minutes() {
  const [minutes, setMinutes] = useState(5)
  const [error, setError] = useState(null)

  const handleAdd = () => {
    if (minutes < 9) {
      setMinutes(minutes + 1)
      setError(null)
    } else {
      setError("Less than 10 please.")
    }
  }

  const handleSubtract = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1)
      setError(null)
    } else {
      setError("Greater than 0 please")
    }
  }

  console.log(states)

  const el = (
    <div>
      <div className="Minutes">
        <div>
          <button
            onClick={handleSubtract}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaMinus />
          </button>
        </div>
        <div className="Minutes_label" htmlFor="minutes">
          {minutes} Minutes
        </div>
        <div>
          <button
            onClick={handleAdd}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {error && (
          <p>
            {error}{" "}
            <span role="img" aria-label="eep!">
              😬
            </span>
            <br />
            <button onClick={() => setError(null)}>
              dismiss
            </button>
          </p>
        )}
      </div>
    </div>
  )

  return el
}

const states = []
let callCount = -1

function useState(initialValue) {
  const id = ++callCount

  if (states[id]) {
    return states[id]
  }

  const setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHooks()
  }

  const tuplé = [initialValue, setValue]
  states.push(tuplé)
  return tuplé
}

function renderPhonyHooks() {
  callCount = -1
  ReactDOM.render(
    <Minutes />,
    document.getElementById("root")
  )
}
renderPhonyHooks()
