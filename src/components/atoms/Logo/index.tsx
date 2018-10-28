import * as React from "react"
import styled from "styled-components"
import Image from "./logo.svg"

interface IProps {
  size: number
}

export const Logo = (props: IProps) => (
  <Wrapper {...props}>
    <img src={Image} />
  </Wrapper>
)

const Wrapper = styled.div<IProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size * 0.4333}px;
  img {
    width: 100%;
  }
`
