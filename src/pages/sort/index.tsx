import * as React from "react"
import styled from "styled-components"
import { Track } from "../../components/molecules/Track"
import SoundCloud from "../../lib/SoundCloud4ts/singleton"
import { Player } from "../../components/molecules/player"
import { ITrack } from "../../interface/track"

interface IState {
  tracks: ITrack[]
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
    }
  }

  public componentDidMount() {
    this.getTracks()
  }

  public render() {
    return (
      <Wrapper>
        {this.state.tracks.map(track => (
          <Track key={track.id} {...track} />
        ))}
        <Player />
      </Wrapper>
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
    alert("取得完了")
  }
}

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`
