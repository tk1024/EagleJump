import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

interface IProps {
  trackLenght: number
}

export const Loading = ({ trackLenght }: IProps) => {
  return (
    <Wrapper>
      <div>
        <FontAwesomeIcon icon={faSpinner} spin={true} />
      </div>
      <LoadingText>
        楽曲読み込み中・・・
        <br />
        現在: {trackLenght} 曲読み込み完了
      </LoadingText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-size: 5rem;
  padding: 100px;
  text-align: center;
`

const LoadingText = styled.div`
  font-size: 1.2rem;
`
