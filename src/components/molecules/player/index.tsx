import * as React from "react"
import styled, { keyframes } from "styled-components"
import Color from "../../../style/const/color"
import { connect } from "react-redux"
import { ITrack } from "../../../interface/track"
import SoundCloud from "../../../lib/SoundCloud4ts/singleton"
import { TrackThumbnail } from "../../atoms/track-thumbnail"

interface IProps extends ITrack {
  player?: ITrack
}

interface IState {
  isPlaying: false
}

class Component extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    if (!this.props.player) {
      return <></>
    }
    if (!this.props.player.stream_url) {
      return
    }
    const { player } = this.props
    return (
      <Wrapper>
        <Info>
          <TrackThumbnail size={60} player={player} />
          <InfoText>
            <UserName href={player.user.permalink_url} target="_blank">
              {player.user.username}
            </UserName>
            <Title href={player.permalink_url} target="_blank">
              {player.title}
            </Title>
          </InfoText>
        </Info>
        <audio
          src={`${player.stream_url}?oauth_token=${SoundCloud.oauthToken}`}
          controls={true}
          autoPlay={true}
        />
      </Wrapper>
    )
  }
}

function mapStateToProps({ player }: any) {
  return {
    player,
  }
}

export const Player = connect(mapStateToProps)(Component)

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
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const InfoText = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`

const UserName = styled.a`
  color: ${Color.DIMGRAY};
  font-size: 0.8rem;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`

const Title = styled.a`
  color: ${Color.LIGHT_BLACK};
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`
