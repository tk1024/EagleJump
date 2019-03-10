import * as React from "react"
import styled, { keyframes } from "styled-components"
import Color from "../../../style/const/color"
import SoundCloud from "../../../lib/SoundCloud4ts/singleton"
import {
  container,
  IContainerStateToProps,
} from "src/components/molecules/player/container"
import { RangeSliderWithTime } from "src/components/molecules/player/components/range-slider-with-time"
import { TrackInformation } from "src/components/molecules/player/components/track-information"
import { OperationButtons } from "src/components/molecules/player/components/operation-buttons"
import { ChangeFavicon } from "src/lib/change-favicon"
import { shortcut } from "src/components/molecules/player/shortcut"

type IProps = IContainerStateToProps

class Component extends React.Component<IProps> {
  private audio = React.createRef<HTMLAudioElement>()

  constructor(props: IProps) {
    super(props)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
    this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this)
    this.checkAndDoIfneededUpdatePlayTime = this.checkAndDoIfneededUpdatePlayTime.bind(
      this
    )
    this.checkAndDoIfneededUpdateIsPlaying = this.checkAndDoIfneededUpdateIsPlaying.bind(
      this
    )
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
  }

  public componentDidMount(): void {
    shortcut(this.props.actions)
  }

  public componentDidUpdate(prevProps: Readonly<IProps>): void {
    // TODO: タイトル更新用のReduxのアレをアレするようにする
    if (
      prevProps.player &&
      this.props.player.title !== prevProps.player.title
    ) {
      document.title = `${this.props.player.title} - EagleJump`
      ChangeFavicon(
        this.props.player.artwork_url || this.props.player.user.avatar_url
      )
    }
    this.checkAndDoIfneededUpdatePlayTime()
    this.checkAndDoIfneededUpdateIsPlaying(prevProps)
  }

  public render() {
    const { player, playerMetaData } = this.props
    if (!(player && player.stream_url)) {
      return null
    }
    return (
      <>
        <Wrapper>
          <OperationButtons />
          <RangeSliderWithTime
            totalTime={player.duration}
            currentTime={playerMetaData.currentTime}
            selectedPosition={this.onPlayTimeUpdate}
          />
          <TrackInformation player={player} />
        </Wrapper>
        <audio
          src={`${player.stream_url}?oauth_token=${SoundCloud.oauthToken}`}
          autoPlay={true}
          onTimeUpdate={this.onTimeUpdate}
          ref={this.audio}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
      </>
    )
  }

  private onTimeUpdate(): void {
    if (this.audio.current) {
      this.props.actions.updateCurrentTime(this.audio.current.currentTime)
    }
  }

  private onPlayTimeUpdate(selectedPositionPercent: number): void {
    const newTime =
      ((selectedPositionPercent / 100) * this.props.player.duration) / 1000
    this.props.actions.updatePlayTime(newTime)
  }

  private checkAndDoIfneededUpdatePlayTime(): void {
    if (this.props.playerMetaData.updatePlayTime !== null) {
      if (!this.audio.current) {
        return
      }
      this.audio.current.currentTime = this.props.playerMetaData.updatePlayTime
      this.props.actions.updateCurrentTime(
        this.props.playerMetaData.updatePlayTime
      )
      this.props.actions.updatePlayTime(null)
    }
  }

  private checkAndDoIfneededUpdateIsPlaying(prevProps: IProps): void {
    if (!this.audio.current) {
      return
    }
    if (
      prevProps.playerMetaData.isPlaying === this.props.playerMetaData.isPlaying
    ) {
      return
    }
    if (this.audio.current.paused === !this.props.playerMetaData.isPlaying) {
      return
    }
    if (this.props.playerMetaData.isPlaying) {
      this.audio.current.play()
    } else {
      this.audio.current.pause()
    }
  }

  private onPlay() {
    this.props.actions.onPlay()
  }

  private onPause() {
    this.props.actions.onPause()
  }
}

export const Player = container(Component)

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background-color: ${Color.LIGHT_GRAY};
  border-top: 1px solid ${Color.GRAY};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  animation: ${slideIn} 0.3s ease-out forwards;
  color: ${Color.DIMGRAY};
`
