import React from 'react'

const Card = ({children, open, ...props}) => (
  <div className={`card ${open ? 'card--open' : ''}`} {...props}>
    {children}
  </div>
)

export {Card}
