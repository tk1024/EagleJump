import * as React from "react"
import styled from "styled-components"
import { IRootState } from "src/reducers"
import { TrackThumbnail } from "src/components/atoms/track-thumbnail"
import Color from "src/style/const/color"

interface IProps {
  player: IRootState["player"]
}

export const TrackInformation = ({ player }: IProps) => (
  <Info>
    <TrackThumbnail size={50} player={player} />
    <InfoText>
      <UserName href={player.user.permalink_url} target="_blank">
        {player.user.username}
      </UserName>
      <Title href={player.permalink_url} target="_blank">
        {player.title}
      </Title>
    </InfoText>
  </Info>
)

const Info = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
`

const InfoText = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const UserName = styled.a`
  color: ${Color.DIMGRAY};
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`

const Title = styled.a`
  color: ${Color.LIGHT_BLACK};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`
