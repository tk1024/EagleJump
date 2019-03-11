import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp"
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons/faVolumeMute"
import { faVolumeDown } from "@fortawesome/free-solid-svg-icons/faVolumeDown"
import styled from "styled-components"
import { Slider } from "src/components/molecules/player/components/audio-slider/slider"
import { IPlayerMetaData } from "src/reducers/player-meta-data"
import Color from "src/style/const/color"

interface IProps {
  muted: IPlayerMetaData["muted"]
  volume: IPlayerMetaData["volume"]
  onChangeVolume: (newVolume: IPlayerMetaData["volume"]) => void
}

interface IState {
  isHover: boolean
}

export class AudioSlider extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.currentVolumeState = this.currentVolumeState.bind(this)
    this.state = {
      isHover: false,
    }
  }

  public render() {
    return (
      <Wrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Slider {...this.props} isHover={this.state.isHover} />
        <IconWrapper>
          <FontAwesomeIcon
            icon={this.getIcon(this.props.volume)}
            fixedWidth={true}
          />
          <Volume>{this.currentVolumeState()}</Volume>
        </IconWrapper>
      </Wrapper>
    )
  }

  private currentVolumeState() {
    if (this.props.muted) {
      return "Mute"
    } else {
      return this.props.volume
    }
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

  private getIcon(valume: number) {
    if (valume === 0) {
      return faVolumeMute
    }
    if (valume < 50) {
      return faVolumeDown
    }
    return faVolumeUp
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 50px;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  padding: 10px;
`

const Volume = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: ${Color.DIMGRAY};
`
