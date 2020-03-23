import React from 'react'
import {motion} from 'framer-motion'

const Overlay = ({isSelected = false}) => (
  <motion.div
    initial={false}
    animate={{opacity: isSelected ? 1 : 0}}
    transition={{duration: 0.2}}
    style={{pointerEvents: isSelected ? 'auto' : 'none'}}
    className="card__overlay"
  />
)

export {Overlay}
