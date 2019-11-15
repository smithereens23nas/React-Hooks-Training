import React, {
  useState,
  useContext,
  createContext,
  Children
} from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return <div data-reach-tabs>{children}</div>
}

function TabList({ children }) {
  return <div data-reach-tab-list>{children}</div>
}

function Tab({ isDisabled, children }) {
  const index = 0 // TODO
  const activeIndex = 0 // TODO
  const setActiveIndex = () => {} // TODO
  const isActive = index === activeIndex
  return (
    <button
      data-reach-tab
      className={
        isDisabled ? "disabled" : isActive ? "active" : ""
      }
      onClick={
        isDisabled ? undefined : () => setActiveIndex(index)
      }
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  const activeIndex = 0 // TODO
  return (
    <div data-reach-tab-panels>{children[activeIndex]}</div>
  )
}

function TabPanel({ children }) {
  return children
}

export default function LoggedOut() {
  const tabData = [
    {
      label: "Login",
      content: <LoginForm />
    },
    {
      label: "Signup",
      content: <SignupForm />
    },
    {
      label: "Order",
      content: <p>Get a nice breakfast sandwich.</p>
    }
  ]

  return (
    <div className="LoggedOut">
      <About />

      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
