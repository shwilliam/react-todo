import React from 'react'

// TODO: use data attrs for state styling
export const Card = ({children, open}) => (
  <div className={`card ${open ? 'card--open' : ''}`}>{children}</div>
)
