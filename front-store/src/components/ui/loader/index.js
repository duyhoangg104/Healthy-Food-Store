/** @format */

import React from 'react'
import loaderImg from '../../../assets/images/loader.gif'
import './index.scss'

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderImg} alt="" />
    </div>
  )
}

export default Loader
