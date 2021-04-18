import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import useStore from "./store/store";

import Landing from "./views/Landing";
import Browse from "./views/Browse";
import Playlist from "./views/Playlist";
import NotFound from "./views/NotFound";
import Mood from "./views/Mood";
import UserRegistration from "./components/userRegistration/UserRegistration";
import Profile from "./views/Profile";
import PlaylistsCreation from "./components/playlistsCreation/PlaylistsCreation";
import Home from "./views/Home";
function App() {
  const accessToken = useStore(state => state.accessToken);

  return (
    <div className="App">
      <div className="appRightColumn">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route path="/browse/:mood" component={Mood} />
          <Route exact path="/playlists/:playlistId" component={Playlist} />
          <Route exact path="/userRegistration" component={UserRegistration} />
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
