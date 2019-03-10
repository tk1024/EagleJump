import * as React from "react"
import styled from "styled-components"
import { ITrack } from "src/interface/track"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { selectedSong } from "src/actions/player"
import { TrackThumbnail } from "../../atoms/track-thumbnail"
import Color from "../../../style/const/color"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import { IRootState } from "src/reducers"
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause"
import { formattedTime } from "src/lib/formatted-time"

interface IProps {
  player: ITrack
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
    this.isPlaying = this.isPlaying.bind(this)
    this.state = {
      isHover: false,
    }
  }

  public render() {
    const { track } = this.props
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
        {this.state.isHover && (
          <PlayIconWrapper>
            <PlayIcon />
          </PlayIconWrapper>
        )}
        {this.isPlaying() && (
          <PlayIconWrapper>
            <PauseIcon />
          </PlayIconWrapper>
        )}
      </Wrapper>
    )
  }

  private isPlaying() {
    const { player, track } = this.props
    return player && player.id === track.id
  }

  private onClick(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignorex
    this.props.selectedSong(this.props.track)
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

function mapStateToProps({ player }: IRootState) {
  return {
    player,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    selectedSong(data: ITrack) {
      dispatch(selectedSong(data))
    },
  }
}

export const Track = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

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
