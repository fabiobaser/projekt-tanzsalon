import React, { Component } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";

import { Playlist } from "./music_playlists_playlist";

//Config
// eslint-disable-next-line
import config from "../../../config";

export class MusicPlaylists extends Component {
  constructor() {
    super();

    this.state = {
      playlists: {}
    };
  }

  componentWillMount() {
    let tmp = [];
    let playlistURLs = [
      "https://api.music.apple.com/v1/catalog/de/playlists/pl.89b427641c4d47adb376d426d2cd118e",
      "https://api.music.apple.com/v1/catalog/de/playlists/pl.f0644f96347447f086b89acf0f710441",
      "https://api.music.apple.com/v1/catalog/de/playlists/pl.u-PZ7DuypbyP6",
      "https://api.music.apple.com/v1/catalog/de/playlists/pl.0513010b42974e278816dbf91ac6dc6b"
    ];
    axios
      .get(playlistURLs[0], {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url //Salsa
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get(playlistURLs[1], {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get(playlistURLs[2], {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });

    axios
      .get(playlistURLs[3], {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
        }
      })
      .then(results => {
        tmp.push({
          name: results.data.data[0].attributes.name,
          appleMusic: results.data.data[0].attributes.url,
          tracks: results.data.data[0].relationships.tracks.data,
          artwork: results.data.data[0].attributes.artwork.url
        });
        this.setState({ playlists: tmp });
      });
  }

  render() {
    let playlists = [0, 1, 2, 3].map(item => {
      return (
        <Grid.Column computer={5} tablet={8} mobile={16} style={{ marginTop: "2em" }}>
          <Playlist index={item} playlists={this.state.playlists} key={item} />
        </Grid.Column>
      );
    });

    return (
      <Grid centered padded>
        <Grid.Row columns={16}>{playlists}</Grid.Row>
      </Grid>
    );
  }
}
