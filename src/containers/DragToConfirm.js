import React, {useCallback} from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'
import {CheckIcon, TrashIcon} from '../components'

const MIN_DRAG_RATIO_FOR_ACTION = 0.75

const DragToConfirm = ({
  minBounds = -50,
  maxBounds = 50,
  onConfirm,
  onCancel,
  className,
  children,
  ...props
}) => {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [minBounds, 0, maxBounds],
    ['#FF5630', '#FFEFD5', '#36B37E'],
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
        <CheckIcon color="papayawhip" />
        <TrashIcon color="papayawhip" />
      </div>
    </motion.div>
  )
}

export {DragToConfirm}
