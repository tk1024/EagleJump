import * as React from "react"
import SoundCloud from "../../lib/SoundCloud4ts/singleton"

interface IState {
  songs: any[]
}

export class SortIndex extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    if (!SoundCloud.oauthToken) {
      location.href = "/";
    }
    this.state = {
      songs: []
    };
  }

  public componentDidMount() {
    this.getSongs();
  }

  public render() {
    return (
      <div className="container m-t-5">
        {this.state.songs.map(song => {
          return (
            <div key={song.id}>{song.title}</div>
          )
        })}
      </div>
    )
  }

  private async getSongs() {
    SoundCloud.get("/me/favorites", {
      limit: 200
    }).then(res => {
      const data = res.data;
      this.setState({
        songs: Object.assign(this.state.songs, data)
      });
    });
  }
}
