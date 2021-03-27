// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/

import { useState, useEffect, useRef, useCallback } from "react"

export const range = (start, end, step = 1) => {
  let output = []
  if (typeof end === "undefined") {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}

const QUERY = "(prefers-reduced-motion: no-preference)"
const isRenderingOnServer = typeof window === "undefined"
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

export const usePrefersReducedMotion = function () {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialState
  )
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = event => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addListener(listener)
    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [])
  return prefersReducedMotion
}

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

export const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = useRef(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  })
  useEffect(() => {
    let isEnabled = typeof minDelay === "number" && typeof maxDelay === "number"
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current)
  }, [])
  return cancel
}
