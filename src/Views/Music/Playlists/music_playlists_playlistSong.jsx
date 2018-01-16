import React, { Component } from "react";
import { Feed } from "semantic-ui-react";

export class PlaylistSong extends Component {
  render() {
    return (
      <Feed.Event as="a">
        <Feed.Label image={this.props.cover} />
        <Feed.Content>
          <Feed.Summary>{this.props.title}</Feed.Summary>
          <Feed.Date content={this.props.artist} />
        </Feed.Content>
      </Feed.Event>
    );
  }
}
