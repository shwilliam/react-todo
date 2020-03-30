import React from 'react'
import styles from './VerticalScrollList.module.css'

export const VerticalScrollList = ({children}) => (
  <ol className={styles.list}>{children}</ol>
)
