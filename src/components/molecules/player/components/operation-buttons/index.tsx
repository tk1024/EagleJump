import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause"
import { container, IContainerStateToProps } from "./container"
import styled from "styled-components"

const Component = ({ playerMetaData, actions }: IContainerStateToProps) => {
  const onClick = () => {
    playerMetaData.isPlaying ? actions.onPause() : actions.onPlay()
  }
  return (
    <Wrapper>
      <PlayAndPauseButton onClick={onClick}>
        {playerMetaData.isPlaying && (
          <FontAwesomeIcon icon={faPause} fixedWidth={true} />
        )}
        {!playerMetaData.isPlaying && (
          <FontAwesomeIcon icon={faPlay} fixedWidth={true} />
        )}
      </PlayAndPauseButton>
    </Wrapper>
  )
}

export const OperationButtons = container(Component)

const Wrapper = styled.div`
  width: 100%;
  max-width: 150px;
  flex-shrink: 1;
  display: flex;
  justify-content: center;
`

const PlayAndPauseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
`
