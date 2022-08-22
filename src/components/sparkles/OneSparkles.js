// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/

import React, {useEffect, useRef} from "react"
import styled from "styled-components"
import {random,} from "./sparkleHelpers"
import OneSparkle from './OneSparkle'

const generateSparkle = color => {
    const sparkle = {
        id: String(random(10000, 99999)),
        createdAt: Date.now(),
        color,
        size: 20,
        style: {
            top: '50%',
            left: 0,
        },
    }
    return sparkle
}

const otherpasta = ["#AC92EB", "#4FC1EB", "#A0D568", "#FFC5E4", "#ED5564"]
let counter = 0

const OneSparkles = ({colors = otherpasta, children, ...delegated}) => {
    const sparkleRef = useRef(null)

    let color = colors[counter]
    const colorLen = colors.length
    if (counter < colorLen - 1) {
        counter++
    } else {
        counter = 0
    }

    useEffect(() => {
        sparkleRef.current
    })

    const sparkles = []

    return (
        <OneSparkle
        />
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
export default OneSparkles

// based on a tutorial by Josh W Comeau
// https://www.joshwcomeau.com/react/animated-sparkles-in-react/
