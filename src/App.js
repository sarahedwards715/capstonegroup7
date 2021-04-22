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
import SongPlayer from "./components/songPlayer/SongPlayer";
import ReactAudioPlayer from "react-audio-player";
import Album from "./views/Album";
import Artist from "./views/Artist";
import Search from "./views/Search";
import SearchBar from "./components/searchBar/SearchBar";

function App() {
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);
  const selectedTrackToPlay = useStore((state) => state.selectedTrackToPlay);

  return (
    <div className="App">
      <Navigation />
      <div className="appWrapper">
        {accessToken && user.moodifyToken && (
          <div className="appLeftColumn">
            <>
              <SearchBar />
              <PlaylistsCreation />
            </>
            <div className="playerContainer">
              {/* <SongPlayer accessToken={accessToken} /> */}

              {accessToken && (
                // <div className="previewPlayerWrapper">
                  <ReactAudioPlayer
                    src={selectedTrackToPlay}
                    autoPlay
                    controls
                  />
                // </div>
              )}
            </div>
          </div>
        )}
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
      </div>
    </div>
  );
}

export default App;
