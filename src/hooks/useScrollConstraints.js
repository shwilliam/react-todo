import {useState, useEffect} from 'react'

export const useScrollConstraints = (ref, measureConstraints) => {
  const [constraints, setConstraints] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  useEffect(() => {
    if (!measureConstraints) return

    const element = ref.current
    const viewportHeight = window.innerHeight
    const contentTop = element.offsetTop
    const contentHeight = element.offsetHeight
    const scrollableViewport = viewportHeight - contentTop * 2
    const top = Math.min(scrollableViewport - contentHeight, 0)

    setConstraints(s => ({...s, top}))
  }, [measureConstraints, ref])

  return constraints
}
