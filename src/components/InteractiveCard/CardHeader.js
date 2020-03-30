import React from 'react'
import {motion, useInvertedScale} from 'framer-motion'
import {closeSpring, openSpring} from './animations'
import {MinusIcon, PlusIcon} from '../'
import styles from './InteractiveCard.module.css'

const scaleTranslate = ({x, y, scaleX, scaleY}) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`

export const CardHeader = ({isSelected, children, ...props}) => {
  const inverted = useInvertedScale()
  const x = isSelected ? 0 : 1
  const y = x

  return (
    <motion.header
      className={styles.header}
      initial={false}
      animate={{x, y}}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{...inverted, originX: 0, originY: 0}}
      {...props}
    >
      {children}
      <div className={styles.headerAction}>
        {isSelected ? <MinusIcon /> : <PlusIcon />}
      </div>
    </motion.header>
  )
}
