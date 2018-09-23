import * as React from "react"
import styled from "styled-components"
import { ITrack } from "../../../interface/track"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { selectedSong } from "../../../actions/player"
import { TrackThumbnail } from "../../atoms/track-thumbnail"

class Component extends React.Component<ITrack, {}> {
  constructor(props: any) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  public render() {
    return (
      <Wrapper onClick={this.onClick}>
        <ThumbnailWrapper>
          <TrackThumbnail size={150} player={this.props} />
          <Duration>{this.formatedDuration()}</Duration>
        </ThumbnailWrapper>
        <Title title={this.props.title}>{this.props.title}</Title>
        <Username title={this.props.user.username}>
          {this.props.user.username}
        </Username>
      </Wrapper>
    )
  }

  private onClick(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    this.props.selectedSong(this.props)
  }

  private formatedDuration(): string {
    const secNum = Math.ceil((this.props.duration || 1) / 1000)
    let hours: any = Math.floor(secNum / 3600)
    let minutes: any = Math.floor((secNum - hours * 3600) / 60)
    let seconds: any = secNum - hours * 3600 - minutes * 60

    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
  }
}

function mapStateToProps(state: any) {
  return {}
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
  border: 1px solid #eee;
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
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Username = styled.div`
  font-size: 10px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
