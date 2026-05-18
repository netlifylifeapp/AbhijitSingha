import { useState, useEffect, useCallback } from 'react'

export function useTypewriter(text, speed = 45, startDelay = 0) {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const reset = useCallback(() => {
    setDisplayText('')
    setIsDone(false)
    setIsStarted(false)
  }, [])

  useEffect(() => {
    let timeout
    let interval

    timeout = setTimeout(() => {
      setIsStarted(true)
      let i = 0
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          setIsDone(true)
          clearInterval(interval)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayText, isDone, isStarted, reset }
}

export function useMultiTypewriter(lines, speed = 40, linePause = 1200) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayLines, setDisplayLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsDone(true)
      return
    }

    const line = lines[currentLine]
    let i = 0
    let charInterval

    const startTyping = () => {
      charInterval = setInterval(() => {
        if (i < line.length) {
          setCurrentText(line.slice(0, i + 1))
          i++
        } else {
          clearInterval(charInterval)
          setTimeout(() => {
            setDisplayLines(prev => [...prev, line])
            setCurrentText('')
            setCurrentLine(prev => prev + 1)
          }, linePause)
        }
      }, speed)
    }

    startTyping()

    return () => clearInterval(charInterval)
  }, [currentLine])

  return { displayLines, currentText, isDone }
}
