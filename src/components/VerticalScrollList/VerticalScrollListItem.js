import React from 'react'
import styles from './VerticalScrollList.module.css'

export const VerticalScrollListItem = ({children}) => (
  <li className={styles.item}>{children}</li>
)
