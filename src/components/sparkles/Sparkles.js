// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/

import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import {
  range,
  usePrefersReducedMotion,
  useRandomInterval,
  random,
} from "./sparkleHelpers"

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
  if (counter <= colorLen) {
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
const Sparkle = ({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"

    return (
    <SparkleWrapper style={style}>
      <SparkleSvg width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </SparkleSvg>
    </SparkleWrapper>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    opacity:1;

  }
  100% {
    transform: rotate(180deg);
    opacity:0.25;
  }
`
const drop = keyframes`
  0% {
    top: 50%;
  }
  100% {
    top: 200%;
  }
`
const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`
const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${drop} 1000ms forwards;
  }
`
const SparkleSvg = styled.svg`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1000ms linear;
  }
`
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
`
export default Sparkles

// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/
