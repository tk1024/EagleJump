import * as React from "react"
import styled from "styled-components"
import { Track } from "../../components/molecules/Track"
import SoundCloud from "../../lib/SoundCloud4ts/singleton"
import { Player } from "../../components/molecules/player"
import { ITrack } from "../../interface/track"
import { Header } from "./components/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

interface IState {
  tracks: ITrack[]
  isLoading: boolean
}

interface IRes {
  data: {
    collection: ITrack[]
    next_href?: string
  }
  status: number
  statusText: "OK" | string
}

export class SortIndex extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    if (!SoundCloud.oauthToken) {
      location.href = "/"
    }
    this.state = {
      tracks: [],
      isLoading: true,
    }
  }

  public componentDidMount() {
    this.getTracks()
  }

  public render() {
    if (this.state.isLoading) {
      return (
        <>
          <Header />
          <Wrapper>
            <Loading>
              <div>
                <FontAwesomeIcon icon={faSpinner} spin={true} />
              </div>
              <LoadingText>楽曲読み込み中・・・</LoadingText>
            </Loading>
          </Wrapper>
        </>
      )
    }

    return (
      <>
        <Header />
        <Wrapper>
          {this.state.tracks.map(track => (
            <Track key={track.id} {...track} />
          ))}
          <Player />
        </Wrapper>
      </>
    )
  }

  private async getTracks() {
    const tracks: ITrack[] = []
    let res: IRes
    let endpoint = "/me/favorites"
    do {
      res = (await SoundCloud.get(endpoint, {
        limit: 200,
        linked_partitioning: 1,
      })) as IRes
      Array.prototype.push.apply(tracks, res.data.collection)
      this.setState({
        tracks: tracks.sort((a: ITrack, b: ITrack) => b.duration - a.duration),
      })
      endpoint = res.data.next_href || ""
      if (window.location.hostname === "localhost") {
        break
      }
    } while (res.data.next_href)
    this.setState({
      isLoading: false,
    })
  }
}

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 60px 0;
  justify-content: space-evenly;
`

const Loading = styled.div`
  font-size: 5rem;
  padding: 100px;
  text-align: center;
`

const LoadingText = styled.div`
  font-size: 1.2rem;
`
