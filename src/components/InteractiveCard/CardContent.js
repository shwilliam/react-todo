import React from 'react'
import {motion} from 'framer-motion'

const variants = {
  open: {opacity: 1, height: 'auto', pointerEvents: 'all'},
  closed: {opacity: 0, height: '0px', pointerEvents: 'none'},
}

export const CardContent = ({isOpen, children}) => (
  <motion.div
    animate={isOpen ? 'open' : 'closed'}
    variants={variants}
    initial="closed"
  >
    {children}
  </motion.div>
)
