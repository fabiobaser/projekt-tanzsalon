import React, { Component } from "react";
import { Card, Feed, Image, Button, Icon } from "semantic-ui-react";
import ToolTip from "react-portal-tooltip";

import { PlaylistSong } from "./music_playlists_playlistSong";

export class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      spotifyNotif: false,
      expanded: false
    };
  }

  /**
   * Shows "Spotify not available" ToolTip
   * @return {[type]} [description]
   */
  showSpotifyNotif = () => {
    this.setState({ spotifyNotif: true });
  };

  /**
   * Hides "Spotify not available" ToolTip
   * @return {[type]} [description]
   */
  hideSpotifyNotif = () => {
    this.setState({ spotifyNotif: false });
  };

  /**
   * Toggle Songs in Playlist-Overview
   * @return {[type]} [description]
   */
  expandSongs = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    let dataSet = typeof this.props.playlists.length !== "undefined" && typeof this.props.playlists[this.props.index] !== "undefined";

    let songs,
      playlistName,
      appleMusic,
      artwork = "";

    if (dataSet) {
      playlistName = this.props.playlists[this.props.index].name;
      appleMusic = this.props.playlists[this.props.index].appleMusic;
      artwork = this.props.playlists[this.props.index].artwork;

      songs = this.props.playlists[this.props.index].tracks.map(song => {
        return (
          <PlaylistSong
            title={song.attributes.name}
            artist={song.attributes.artistName}
            cover={song.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")}
          />
        );
      });
    } else {
      return null;
    }

    return (
      <Card fluid>
        <Card.Content style={{ textAlign: "center", paddingBottom: "0" }}>
          <Card.Header style={{ marginTop: "0.6em", marginBottom: "1em", fontSize: "150%" }}>{playlistName}</Card.Header>
          <Image size="small" src={artwork.replace("{w}", "500").replace("{h}", "500")} />
          <br />
          <a href={appleMusic} target="_blank">
            <Image
              size="mini"
              as="a"
              src="/assets/Apple_Music_Icon.png"
              style={{
                marginTop: "2em",
                marginBottom: "2em",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px",
                borderRadius: "10px",
                marginRight: "1em"
              }}
            />
          </a>
          <Image
            id="spotify"
            size="mini"
            src="/assets/Spotify_Icon_RGB_Green.png"
            onMouseEnter={this.showSpotifyNotif}
            onMouseLeave={this.hideSpotifyNotif}
            style={{
              marginTop: "2em",
              marginBottom: "2em",
              opacity: "0.2"
            }}
          />
          <ToolTip active={this.state.spotifyNotif} position="top" arrow="center" parent="#spotify">
            Spotify, ist momentan noch nicht unterstützt :(
          </ToolTip>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.state.expanded ? songs : null}
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary style={{ textAlign: "center" }}>
                  <Button basic onClick={this.expandSongs}>
                    {this.state.expanded ? <Icon name="angle up" /> : <Icon name="angle down" />}
                    {this.state.expanded ? "Songs verdecken" : "Songs zeigen"}
                  </Button>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}
