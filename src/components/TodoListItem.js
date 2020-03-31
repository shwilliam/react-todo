import React, {useCallback, useMemo, useState} from 'react'
import {motion} from 'framer-motion'
import {HDraggable, ContentEditable, CheckIcon, TrashIcon, CrossIcon} from './'
import {useDoubleClick} from '../hooks'
import styles from './TodoListItem.module.css'

export const TodoListItem = ({
  id,
  listId,
  label,
  done,
  onComplete,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const IconLeft = useMemo(() => (done ? CrossIcon : CheckIcon), [done])
  const colorLeft = useMemo(() => (done ? '#FFAB00' : '#36B37E'), [done])

  const handleDelete = useCallback(() => onDelete(listId, id), [
    onDelete,
    listId,
    id,
  ])

  const handleComplete = useCallback(() => onComplete(listId, id, !done), [
    onComplete,
    listId,
    id,
    done,
  ])

  const handleSave = useCallback(
    label => {
      onUpdate(listId, id, label)
    },
    [listId, id, onUpdate],
  )

  const handleClick = useDoubleClick(handleComplete, null)

  const handleEditStart = useCallback(() => setIsEditing(true), [])

  const handleEditEnd = useCallback(() => setIsEditing(false), [])

  return (
    <motion.div
      className={styles.container}
      initial={{opacity: 0, scaleY: 0}}
      animate={{opacity: 1, scaleY: 1}}
      exit={{opacity: 0, scaleY: 0}}
      positionTransition
      style={{width: '80vw', maxWidth: '500px'}}
    >
      <HDraggable
        disabled={isEditing}
        onDragRight={handleComplete}
        onDragLeft={handleDelete}
        IconLeft={IconLeft}
        IconRight={TrashIcon}
        colorLeft={colorLeft}
        colorRight="#FF5630"
      >
        <input
          type="checkbox"
          id={`todo__complete--${id}`}
          className={styles.checkbox}
          checked={done}
          onChange={handleComplete}
        />
        <label htmlFor={`todo__complete--${id}`}>
          <span className="sr-only">Mark as {done ? 'to do' : 'done'}</span>
          <span className={styles.icon}>{done ? '◉' : '◎'}</span>
        </label>

        <h3
          className={styles.label}
          data-state={done ? 'DONE' : 'TODO'}
          onClick={handleClick}
        >
          <ContentEditable
            value={label}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
            onSave={handleSave}
          />
        </h3>
      </HDraggable>
    </motion.div>
  )
}
