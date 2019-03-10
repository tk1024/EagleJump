import * as React from "react"
import styled from "styled-components"
import Color from "src/style/const/color"

interface IProps {
  totalTime: number
  currentTime: number
  selectedPosition?: (num: number) => void
}

interface IState {
  currentPercent: number
  isHover: boolean
}

export class RangeSlider extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.state = {
      currentPercent: (this.props.currentTime / this.props.totalTime) * 100,
      isHover: false,
    }
  }

  public componentWillReceiveProps(): void {
    this.setState({
      currentPercent: (this.props.currentTime / this.props.totalTime) * 100,
    })
  }

  public render() {
    return (
      <Wrapper
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Bg />
        <CurrentPosition currentPercent={this.state.currentPercent} />
        <Circle
          isShow={this.state.isHover}
          currentPercent={this.state.currentPercent}
        />
      </Wrapper>
    )
  }

  private onClick({
    nativeEvent,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) {
    const clickPositionX =
      nativeEvent.pageX - currentTarget.getBoundingClientRect().left
    const elementWidth = currentTarget.clientWidth
    if (this.props.selectedPosition) {
      this.props.selectedPosition((clickPositionX / elementWidth) * 100)
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
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 1;
  height: 30px;
  cursor: pointer;
`

const Bg = styled.div`
  position: absolute;
  top: 14.5px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${Color.DIMGRAY};
`

const CurrentPosition = styled.div<{
  currentPercent: number
}>`
  position: absolute;
  top: 14.5px;
  left: 0;
  width: ${({ currentPercent }) => currentPercent}%;
  height: 1px;
  background-color: ${Color.BRAND};
`

const Circle = styled.div<{
  currentPercent: number
  isShow: boolean
}>`
  position: absolute;
  left: calc(${({ currentPercent }) => currentPercent}% - 1.5px);
  top: 11.5px;
  width: 7px;
  height: 7px;
  background-color: ${Color.BRAND};
  border-radius: 100%;
  transition: 0.3s;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
`
