import * as React from "react"
import styled from "styled-components"
import Color from "src/style/const/color"
import { IRootState } from "src/reducers"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ITrack } from "src/interface/track"
import { IContainerStateToProps } from "src/components/molecules/Track/container"

interface IProps {
  player: IRootState["player"]
  isPlaying: IRootState["playerMetaData"]["isPlaying"]
  track: ITrack
  isHover: boolean
  actions: IContainerStateToProps["actions"]
}

export const Icon = ({
  track,
  player,
  isPlaying,
  isHover,
  actions,
}: IProps) => {
  const onClickIcon = () => {
    isPlaying ? actions.onPause() : actions.onPlay()
  }
  if (player && player.id === track.id) {
    return (
      <PlayIconWrapper onClick={onClickIcon}>
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
