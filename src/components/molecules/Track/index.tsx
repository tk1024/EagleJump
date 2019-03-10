import * as React from "react"
import { TrackThumbnail } from "../../atoms/track-thumbnail"
import Color from "../../../style/const/color"
import { formattedTime } from "src/lib/formatted-time"
import { container, IContainerStateToProps } from "./container"
import { ITrack } from "src/interface/track"
import { Icon } from ".//components/icon"
import styled from "styled-components"

type IProps = IContainerStateToProps & {
  track: ITrack
}

interface IState {
  isHover: boolean
}

class Component extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.state = {
      isHover: false,
    }
  }

  public render() {
    const { track, player, isPlaying } = this.props
    return (
      <Wrapper
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <ThumbnailWrapper>
          <TrackThumbnail size={150} player={track} />
          <Duration>{formattedTime(this.props.track.duration / 1000)}</Duration>
        </ThumbnailWrapper>
        <Title title={track.title}>{track.title}</Title>
        <Username title={track.user.username}>{track.user.username}</Username>
        <Icon
          track={track}
          isHover={this.state.isHover}
          player={player}
          isPlaying={isPlaying}
          actions={this.props.actions}
        />
      </Wrapper>
    )
  }

  private onClick(event: React.MouseEvent<HTMLDivElement>) {
    this.props.actions.selectedSong(this.props.track)
  }

  private onMouseEnter() {
    this.setState({
      isHover: true,
    })
  }

  private onMouseLeave() {
    this.setState({
      isHover: false,
    })
  }
}

export const Track = container(Component)

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  margin: 10px 3px;
  width: 150px;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  box-sizing: content-box;
  margin-bottom: 4px;
`

const Duration = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #555;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1px 3px;
`

const Title = styled.div`
  font-size: 12px;
  color: ${Color.WHITE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Username = styled.div`
  font-size: 10px;
  color: ${Color.GRAY}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
