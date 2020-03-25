import React, {useMemo} from 'react'
import {motion} from 'framer-motion'

const COLOR_DANGER = '#fa4d56'
const COLOR_SUCCESS = '#42be65'
const COLOR_WARN = '#f1c21b'

export const ProgressBar = ({progress = 0}) => {
  const percentage = useMemo(() => Math.round(progress * 100), [progress])

  return (
    <div className="progress">
      <div className="progress-bar__container">
        <motion.div
          className="progress-bar"
          animate={{
            scaleX: progress,
            backgroundColor:
              progress < 0.33
                ? COLOR_DANGER
                : progress < 0.66
                ? COLOR_WARN
                : COLOR_SUCCESS,
          }}
        />
      </div>

      <p className="progress__text">{percentage}%</p>
    </div>
  )
}
