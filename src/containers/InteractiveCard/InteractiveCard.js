import React, {useCallback, useRef} from 'react'
import {motion, useMotionValue} from 'framer-motion'
import {useScrollConstraints} from '../../hooks'
import {Card} from '../../components'
import {openSpring, closeSpring} from './animations'

const InteractiveCard = ({onToggle, isOpen = false, children}) => {
  const cardRef = useRef(null)
  const y = useMotionValue(0)
  const zIndex = useMotionValue(isOpen ? 2 : 0)
  const scrollConstraints = useScrollConstraints(cardRef, isOpen)

  const checkSwipeToToggle = useCallback(() => {
    const yOffset = Math.abs(y.get())
    if (yOffset > (isOpen ? 100 : 40)) onToggle()
  }, [onToggle, y, isOpen])

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
        className={`card__content ${isOpen ? 'card__content--open' : ''}`}
        style={{zIndex, y}}
        layoutTransition={isOpen ? openSpring : closeSpring}
        drag={isOpen ? 'y' : false}
        dragConstraints={scrollConstraints}
        onDrag={checkSwipeToToggle}
        onUpdate={checkZIndex}
      >
        {children}
      </motion.div>
    </Card>
  )
}

export {InteractiveCard}
