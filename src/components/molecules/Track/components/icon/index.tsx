import * as React from "react"
import styled from "styled-components"
import Color from "src/style/const/color"
import { IRootState } from "src/reducers"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IProps {
  isPlaying: IRootState["playerMetaData"]["isPlaying"]
  isHover: boolean
  isPlayingTrack: boolean
}

export const Icon = ({ isPlaying, isHover, isPlayingTrack }: IProps) => {
  if (isPlayingTrack) {
    return (
      <PlayIconWrapper>
        {isPlaying && <PauseIcon />}
        {!isPlaying && <PlayIcon />}
      </PlayIconWrapper>
    )
  } else if (isHover) {
    return (
      <PlayIconWrapper>
        <PlayIcon />
      </PlayIconWrapper>
    )
  }

  return null
}

const PlayIconWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.BRAND};
  border-radius: 100%;
`

const PlayIcon = styled(FontAwesomeIcon).attrs({
  icon: faPlay,
})`
  font-size: 24px;
  position: relative;
  left: 2px;
`

const PauseIcon = styled(FontAwesomeIcon).attrs({
  icon: faPause,
})`
  font-size: 24px;
  position: relative;
`
