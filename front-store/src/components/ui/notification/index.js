/** @format */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNoti } from '../../../store/slice/uiSlice'
import './index.scss'

const Notification = () => {
  const { notifications } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  return (
    <div className="notification-container">
      {notifications.map((noti) => (
        <div
          className={`notification-item ${noti.type}`}
          key={noti.id}
          onClick={() => dispatch(removeNoti(noti.id))}
        >
          {noti.msg}
        </div>
      ))}
    </div>
  )
}

export default Notification
