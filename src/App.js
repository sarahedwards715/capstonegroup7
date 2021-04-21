import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import useStore from "./store/store";
import Landing from "./views/Landing";
import Browse from "./views/Browse";
import Playlist from "./views/Playlist";
import NotFound from "./views/NotFound";
import Mood from "./views/Mood";
import Profile from "./views/Profile";
import PlaylistsCreation from "./components/playlistsCreation/PlaylistsCreation";
import Home from "./views/Home";
import Navigation from "./components/navigation/Navigation";
import Album from "./views/Album";
import Artist from "./views/Artist";
import Search from "./views/Search";

function App() {
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);

  return (
    <div className="App">
      {accessToken && user.moodifyToken && <Navigation />}
      <div className="appRightColumn">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route path="/browse/:mood" component={Mood} />
          <Route exact path="/playlists/:playlist_id" component={Playlist} />
          <Route exact path="/albums/:album_id" component={Album} />
          <Route exact path="/artists/:artist_id" component={Artist} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/userProfile" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <div className="appLeftColumn">
        {accessToken && <PlaylistsCreation />}
      </div>
    </div>
  );
}

export default App;
