import React from 'react'
import "./container.css"   // 👈 import css

function Container({ children }) {
  return (
    <div className="container-wrapper">
      {children}
    </div>
  )
}

export default Container
