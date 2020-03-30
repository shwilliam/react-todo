import React from 'react'
import styles from './Card.module.css'

export const Card = ({children, open}) => (
  <div className={styles.card} data-state={open ? 'OPEN' : 'CLOSED'}>
    {children}
  </div>
)
