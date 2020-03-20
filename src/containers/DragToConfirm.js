import React, {useCallback} from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'
const MIN_DRAG_RATIO_FOR_ACTION = 0.75

const DragToConfirm = ({
  minBounds = -50,
  maxBounds = 50,
  onConfirm,
  onCancel,
  children,
  ...props
}) => {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [minBounds, 0, maxBounds],
    ['#FF5630', 'rgba(0,0,0,0)', '#36B37E'],
  )

  const handleDragEnd = useCallback(
    (_, {point}) => {
      if (point.x > maxBounds * MIN_DRAG_RATIO_FOR_ACTION) {
        onConfirm()
      } else if (point.x < minBounds * MIN_DRAG_RATIO_FOR_ACTION) {
        onCancel()
      }
    },
    [maxBounds, minBounds, onConfirm, onCancel],
  )

  return (
    <motion.span
      drag="x"
      dragConstraints={{left: 0, right: 0}}
      onDragEnd={handleDragEnd}
      style={{x, background}}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export {DragToConfirm}
