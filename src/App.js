import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Switch, Route } from "react-router-dom";

//COMPS
import { TopMenu } from "./Views/general";
import { Home } from "./Views/Home/home";
import { MusicAdd } from "./Views/Music/Add/music_add";
import { MusicSearch } from "./Views/Music/Search/music_search";
import { MusicPlaylists } from "./Views/Music/Playlists/music_playlists";
import { Schools } from "./Views/Schools/schools";

export default class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <Route exact path="/" component={Home} />

        <Route path="/music/search" component={MusicSearch} />
        <Route path="/music/add" component={MusicAdd} />
        <Route path="/music/playlists" component={MusicPlaylists} />
        <Route path="/schools" component={Schools} />

        {/* <Route path="/schools" component={Schools} /> */}
      </div>
    );
  }
}
