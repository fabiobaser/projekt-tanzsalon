import React, { Component } from "react";
import axios from "axios";
import { Grid, Input, Table, Header, Segment, Loader, Dimmer } from "semantic-ui-react";

import { SongRow } from "./music_add_songRow";

//Config
// eslint-disable-next-line
import config from "../../../config";
//Helper
import helper from "../../../Helper/converts";

export class MusicAdd extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "Nothing else",
      searchResults: [],
      isLoading: false,
      searchType: "songs",
      activeSong: false
    };
  }

  componentWillMount() { this.updateSongs(""); }

  /**
   * Search through Apple Music Api
   * @param  {String} value Search String from Input-Field
   */
  updateSongs = value => {
    if (value !== "") {
      this.setState({ isLoading: true });
      axios
        .get("https://api.music.apple.com/v1/catalog/de/search", {
          params: {
            term: value,
            types: "songs",
            limit: "20"
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
          }
        })
        .then(axiosResult => {
          if (!!Object.keys(axiosResult.data.results).length) {
            this.setState({ searchResults: axiosResult.data.results.songs.data, searchFound: true });
          } else {
            this.setState({ searchFound: false });
          }
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: true });
      axios
        .get("https://api.music.apple.com/v1/catalog/us/charts", {
          params: {
            types: "songs",
            limit: "20"
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNKTEwyTTdFODMifQ.eyJpYXQiOjE1MDk3MTM1ODEsImV4cCI6MTUyNTI2NTU4MSwiaXNzIjoiNTZWVDczWVNQOSJ9.8wu6SY1g5mMBuzBlR26cPNCdA_L575nDxHvsCWm1GUqz_doCwKNlTLQ9oMATNKPWfzb11GfPaQf99-TwUMOTHQ"
          }
        })
        .then(axiosResult => {
          this.setState({ searchResults: axiosResult.data.results.songs[0].data });
          this.setState({ isLoading: false });
        });
    }
  };

  /**
   * Function to handle Audio-Playback
   * @param  {[type]} e     Synthetic Event
   * @param  {[type]} index Property: Index of clicked Row
   * @param  {[type]} value Property: Value of clicked Row
   */
  playSong = (e, { index, value }) => {
    let audio = document.getElementById("audio");
    let source = document.getElementById("audioSource");

    if (this.state.activeSong === index) {
      //Pause current Song
      this.setState({ activeSong: false }, () => {
        audio.pause();
      });
    } else {
      //Load and Play Song
      this.setState({ activeSong: index }, () => {
        source.src = value;
        audio.load();
        audio.play();
      });
    }
  };

  /**
 * Handles setState when Input-Value changes
 * @param  {[type]} e     Synthetic Event
 * @param  {[type]} value Property: Value of Input
 */
  handleSearchInputChange = (e, { value }) => {
    this.setState({ searchResults: [] }, () => {
      this.updateSongs(value);
      this.setState({ searchTerm: value });
    });
  };

  render() {
    let { searchResults, isLoading, activeSong } = this.state;

    let songs = searchResults.map((item, index) => {
      return (
        <SongRow
          appleMusicID={item.id}
          title={item.attributes.name}
          artist={item.attributes.artistName}
          time={helper.millisToMin(item.attributes.durationInMillis)}
          coverURL={item.attributes.artwork.url}
          colors={item.attributes.artwork}
          previewURL={item.attributes.previews[0].url}
          index={item.id}
          activeSong={activeSong}
          playSong={this.playSong}
          key={item.id}
        />
      );
    });
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Input
              transparent
              fluid
              className="addSearchInput"
              placeholder="Song finden ..."
              style={{ fontSize: "4em", textAlign: "right", marginTop: "1em", marginBottom: "1em" }}
              onChange={this.handleSearchInputChange}
            />
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column width={16}>
            <Header as="h5" style={{ fontStyle: "italic", color: "rgba(0,0,0,0.4)" }}>
              TIPP: Song suchen > Rechts auf Plus drücken > Tänze auswählen
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Segment basic style={{ minHeight: "15em" }}>
              <Dimmer active={isLoading}>
                <Loader>Lädt funky Musik</Loader>
              </Dimmer>
              <Table singleLine>
                <Table.Body>{songs}</Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
  }
}
