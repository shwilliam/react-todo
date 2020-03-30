import React, {useCallback, useRef} from 'react'
import {motion, useMotionValue} from 'framer-motion'
import {useScrollConstraints} from '../../hooks'
import {Card} from '../'
import {openSpring, closeSpring} from './animations'
import styles from './InteractiveCard.module.css'

export const InteractiveCard = ({onToggle, isOpen = false, children}) => {
  const cardRef = useRef(null)
  const y = useMotionValue(0)
  const x = useMotionValue(0)
  const zIndex = useMotionValue(isOpen ? 2 : 0)
  const scrollConstraints = useScrollConstraints(cardRef, isOpen)

  const checkSwipeToToggle = useCallback(() => {
    const yOffset = Math.abs(y.get())
    const xOffset = Math.abs(x.get())
    if (yOffset > 100 || xOffset > 75) onToggle()
  }, [onToggle, x, y])

  const checkZIndex = useCallback(
    latest => {
      if (isOpen) {
        zIndex.set(2)
      } else if (!isOpen && latest.scaleX < 1.01) {
        zIndex.set(0)
      }
    },
    [isOpen, zIndex],
  )

  return (
    <Card open={isOpen}>
      <motion.div
        ref={cardRef}
        className={isOpen ? styles.contentOpen : styles.content}
        style={{zIndex, y, x}}
        layoutTransition={isOpen ? openSpring : closeSpring}
        drag={isOpen ? true : false}
        dragConstraints={scrollConstraints}
        onDrag={checkSwipeToToggle}
        onUpdate={checkZIndex}
      >
        {children}
      </motion.div>
    </Card>
  )
}
