// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/

import React, { useState } from "react"
import styled from "styled-components"
import {
  range,
  usePrefersReducedMotion,
  useRandomInterval,
  random,
} from "./sparkleHelpers"
import Sparkle from './Sparkle'

const generateSparkle = color => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(50) + "%",
      left: random(0, 115) + "%",
    },
  }
  return sparkle
}

const otherpasta = ["#AC92EB", "#4FC1EB", "#A0D568", "#FFC5E4", "#ED5564"]
let counter = 0

const Sparkles = ({ colors = otherpasta, children, ...delegated }) => {
  let color = colors[counter]
  const colorLen = colors.length
  if (counter < colorLen-1) {
    counter++
  } else {
    counter = 0
  }

  const [sparkles, setSparkles] = useState(() => {
    return range(1).map(() => generateSparkle(color))
  })
  const prefersReducedMotion = usePrefersReducedMotion()
  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color)
      const now = Date.now()
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  )
  return (
    <Wrapper {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`

const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
`
export default Sparkles

// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/
