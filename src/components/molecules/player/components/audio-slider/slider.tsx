import * as React from "react"
import styled from "styled-components"
import Color from "src/style/const/color"
import { throttle } from "lodash"
import { IPlayerMetaData } from "src/reducers/player-meta-data"

interface IProps {
  muted: IPlayerMetaData["muted"]
  volume: IPlayerMetaData["volume"]
  onChangeVolume: (newVolume: IPlayerMetaData["volume"]) => void
  isHover: boolean
}

interface IState {
  onMouseDown: boolean
}

export class Slider extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.getMousePosition = this.getMousePosition.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.throttledMouseMove = throttle(this.throttledMouseMove.bind(this), 15)
    this.currentValue = this.currentValue.bind(this)
    this.state = {
      onMouseDown: false,
    }
  }

  public componentDidMount(): void {
    document.addEventListener("mouseup", this.onMouseUp)
  }

  public render() {
    if (this.props.isHover || this.state.onMouseDown) {
      return (
        <Wrapper
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
        >
          <Bg>
            <Bar heightPercent={this.currentValue()} />
            <Pointer heightPercent={this.currentValue()} />
          </Bg>
        </Wrapper>
      )
    }
    return null
  }

  private currentValue() {
    if (!this.props.muted) {
      return this.props.volume
    } else {
      return 0
    }
  }

  private onClick(ev: React.MouseEvent<HTMLDivElement>) {
    this.getMousePosition(ev)
  }

  private onMouseMove(ev: React.MouseEvent<HTMLDivElement>) {
    ev.persist()
    if (this.state.onMouseDown) {
      this.throttledMouseMove(ev)
    }
  }

  private throttledMouseMove(ev: React.MouseEvent<HTMLDivElement>) {
    this.getMousePosition(ev)
  }

  private onMouseDown(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault()
    this.setState({
      onMouseDown: true,
    })
  }

  private onMouseUp() {
    if (this.state.onMouseDown) {
      this.setState({
        onMouseDown: false,
      })
    }
  }

  private getMousePosition({
    nativeEvent,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) {
    if (nativeEvent && currentTarget) {
      const clickPositionY =
        nativeEvent.pageY - currentTarget.getBoundingClientRect().top - 10
      this.props.onChangeVolume(
        100 - Math.max(0, Math.min(100, clickPositionY))
      )
    }
  }
}

const Wrapper = styled.div`
  position: absolute;
  width: 30px;
  height: 120px;
  bottom: 40px;
  background-color: ${Color.LIGHT_GRAY};
  border: 1px solid ${Color.GRAY};
  cursor: pointer;
  overflow: hidden;
  animation: expand 0.1s ease-in-out;
  @keyframes expand {
    from {
      height: 0;
      border: 1px solid ${Color.TRANSPARENT};
    }
  }
`

const Bg = styled.div`
  position: absolute;
  top: 10px;
  left: 14px;
  width: 2px;
  height: 100px;
  background-color: ${Color.GRAY};
`

const Bar = styled.div.attrs({
  style: ({ heightPercent }: any) => ({
    height: `${heightPercent}%`,
  }),
})<{
  heightPercent: number
}>`
  position: absolute;
  bottom: 0;
  width: 2px;
  background-color: ${Color.BRAND};
`

const Pointer = styled.button.attrs({
  style: ({ heightPercent }: any) => ({
    bottom: `calc(${heightPercent}% - 4.5px)`,
  }),
})<{
  heightPercent: number
}>`
  position: absolute;
  left: -4.5px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${Color.BRAND};
  padding: 0;

  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
`
