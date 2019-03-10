import * as React from "react"
import { ITrack } from "../../../interface/track"
import styled from "styled-components"

interface IProps {
  size: number
  player: ITrack
}

export const TrackThumbnail = (props: IProps) => <Thumbnail {...props} />

const Thumbnail = styled.div<IProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${({ player }) =>
    player.artwork_url || player.user.avatar_url});
  flex-shrink: 0;
`
