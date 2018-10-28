import * as React from "react"
import styled from "styled-components"
import Color from "../../../style/const/color"
import { Logo } from "../../../components/atoms/Logo"
import { Link } from "react-router-dom"

export const Header = () => (
  <Wrapper>
    <Logo size={100} />
    <Link to={"./logout"}>ログアウト</Link>
  </Wrapper>
)

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 20px;
  background-color: ${Color.LIGHT_GRAY};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
