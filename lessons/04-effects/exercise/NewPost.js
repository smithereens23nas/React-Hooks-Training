import React, { useState, useEffect, useRef } from "react"
import { FaDumbbell } from "react-icons/fa"

import { useAppState } from "app/app-state"
import { formatDate, DATE_FORMAT } from "app/utils"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const MAX_MESSAGE_LENGTH = 200

export default function NewPost({
  takeFocus,
  date,
  onSuccess,
  showAvatar
}) {
  const [{ auth }] = useAppState()
  const key = makeNewPostKey(date)
  const [message, setMessage] = useState(
    getLocalStorageValue(key) || ""
  )
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH

  function handleMessageChange(event) {
    setMessage(event.target.value)
  }

  //useRef to pass the focus to the message
  const messageRef = useRef(takeFocus)
  //useEffect to takeFocus on the message and load only when takeFocus changes.
  useEffect(() => {
    if (takeFocus) {
      messageRef.current.focus()
    }
  }, [takeFocus])

  //when the message changes set it to local storage.
  useEffect(() => {
    setLocalStorage(key, message)
  }, [key, message])

  return (
    <div
      className={
        "NewPost" + (messageTooLong ? " NewPost_error" : "")
      }
    >
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          ref={messageRef}
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown
          uid={auth.uid}
          onSelect={setMessage}
        />
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button
              type="submit"
              className="icon_button cta"
            >
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function makeNewPostKey(date) {
  return `newPost:${formatDate(date, DATE_FORMAT)}`
}

function getLocalStorageValue(key) {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
