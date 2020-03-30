import React from 'react'
import styles from './Card.module.css'

// TODO: use data attrs for state styling
export const Card = ({children, open}) => (
  <div className={open ? styles.open : styles.card}>{children}</div>
)
