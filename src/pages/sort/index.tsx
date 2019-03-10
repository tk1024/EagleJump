import * as React from "react"
import styled from "styled-components"
import SoundCloud from "../../lib/SoundCloud4ts/singleton"
import { Player } from "src/components/molecules/player"
import { ITrack } from "src/interface/track"
import { Header } from "./components/header"
import { Loading } from "src/pages/sort/components/loading"
import { Track } from "src/components/molecules/Track"

type IProps = any

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

export class SortIndex extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
    return (
      <>
        <Header />
        <Wrapper>
          {this.state.isLoading && (
            <Loading trackLenght={this.state.tracks.length} />
          )}
          {!this.state.isLoading && (
            <>
              {this.state.tracks.map(track => (
                <Track key={track.id} track={track} />
              ))}
              <Player />
            </>
          )}
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
