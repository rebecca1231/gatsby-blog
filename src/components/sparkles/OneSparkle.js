import React from "react"
import styled, {keyframes} from "styled-components"


const comeInOut = keyframes`
0% {
  transform: scale(0) rotate(0deg);
}
50% {
  transform: scale(1.2) rotate(50deg);
}
100% {
  transform: scale(0) rotate(180deg);
}
`;

const SparkleWrapper = styled.span`
`
const SparkleSvg = styled.svg`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} 1000ms linear;
  }
`

const otherpasta = ["#AC92EB", "#4FC1EB", "#A0D568", "#FFC5E4", "#ED5564"]
let counter = 0

const OneSparkle = ({colors = otherpasta, size}) => {
    let color = colors[counter]
    const colorLen = colors.length
    if (counter < colorLen - 1) {
        counter++
    } else {
        counter = 0
    }

    const path =
        "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"

    return (
        <SparkleWrapper>
            <SparkleSvg width={size} height={size} viewBox="0 0 68 68" fill="none">
                <path d={path} fill={color}
                />
            </SparkleSvg>
        </SparkleWrapper>
    )
}

export default OneSparkle
