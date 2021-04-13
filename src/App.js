import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import useStore from "./store/store";

import Landing from "./views/Landing";
import Browse from "./views/Browse";
import Playlist from "./views/Playlist";
import NotFound from "./views/NotFound";
import Mood from "./views/Mood";
import Navigation from "./components/navigation/Navigation";
import PlaylistsCreation from "./components/playlistsCreation/PlaylistsCreation";

function App() {
  const accessToken = useStore((state) => state.accessToken);

  return (
    <div className="App">
      <div className="appRightColumn">
        <Navigation />
        {accessToken || <p>You Are Not Authorized! Login with Spotify!</p>}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/browse" component={Browse} />
          <Route path="/browse/:mood" component={Mood} />
          <Route exact path="/playlist/:playlistId" component={Playlist} />
          <Route path="*" component={NotFound} />
        </Switch>
      <div className="appLeftColumn">
        Hello From App Wrapper
        {accessToken && <PlaylistsCreation />}
      </div>
      </div>
    </div>
  );
}

export default App;
