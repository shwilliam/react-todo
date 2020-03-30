import React, {useCallback, useState, useEffect, useMemo} from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'
import {stopEventPropagation} from '../utils'
import styles from './HDraggable.module.css'

const MIN_DRAG_RATIO_FOR_ACTION = 0.75
const ICON_TRANSITION_DELAY = 400

export const HDraggable = ({
  minBounds = -50,
  maxBounds = 50,
  onDragRight,
  onDragLeft,
  IconRight,
  IconLeft,
  colorLeft,
  colorRight,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [currentIconLeft, setCurrentIconLeft] = useState(IconLeft)
  const [currentColorLeft, setCurrentColorLeft] = useState(colorLeft)
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [minBounds, 0, maxBounds],
    [colorRight, '#FFEFD5', currentColorLeft],
  )

  const handleDragEnd = useCallback(
    (_, {point}) => {
      if (point.x > maxBounds * MIN_DRAG_RATIO_FOR_ACTION) {
        onDragRight()
      } else if (point.x < minBounds * MIN_DRAG_RATIO_FOR_ACTION) {
        onDragLeft()
      }
    },
    [maxBounds, minBounds, onDragRight, onDragLeft],
  )

  const handleClickCapture = useCallback(
    e => (x.current > 1 || x.current < -1) && stopEventPropagation(e),
    [x],
  )

  const dragElastic = useMemo(() => (disabled ? 0 : 0.3), [disabled])

  useEffect(() => {
    setTimeout(() => {
      setCurrentIconLeft(IconLeft)
      setCurrentColorLeft(colorLeft)
    }, ICON_TRANSITION_DELAY)
  }, [IconLeft, colorLeft])

  return (
    <motion.div style={{background}} className={styles.container}>
      <motion.span
        drag="x"
        dragElastic={dragElastic}
        dragConstraints={{left: 0, right: 0}}
        onDragEnd={handleDragEnd}
        onClickCapture={handleClickCapture}
        style={{x}}
        className={styles.item}
        {...props}
      >
        {children}
      </motion.span>

      <div className={styles.actions}>
        {currentIconLeft}
        <IconRight />
      </div>
    </motion.div>
  )
}
