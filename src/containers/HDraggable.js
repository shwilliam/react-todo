import React, {useCallback} from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'

const MIN_DRAG_RATIO_FOR_ACTION = 0.75

const HDraggable = ({
  minBounds = -50,
  maxBounds = 50,
  onDragRight,
  onDragLeft,
  IconRight,
  IconLeft,
  colorLeft,
  colorRight,
  className,
  children,
  ...props
}) => {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [minBounds, 0, maxBounds],
    [colorRight, '#FFEFD5', colorLeft],
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

  return (
    <motion.div style={{background}} className="drag-to-confirm">
      <motion.span
        drag="x"
        dragElastic={0.3}
        dragConstraints={{left: 0, right: 0}}
        onDragEnd={handleDragEnd}
        style={{x}}
        className={`drag-to-confirm__item ${className || ''}`}
        {...props}
      >
        {children}
      </motion.span>

      <div className="drag-to-confirm__actions">
        <IconLeft />
        <IconRight />
      </div>
    </motion.div>
  )
}

export {HDraggable}
