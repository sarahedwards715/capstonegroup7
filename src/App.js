import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import "./App.css";
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
      Hello From App Wrapper
      <Navigation />
      {accessToken && <PlaylistsCreation />}
      {accessToken || <p>You Are Not Authorized! Login with Spotify!</p>}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/browse" component={Browse} />
        <Route path="/browse/:mood" component={Mood} />
        <Route exact path="/playlist/:playlistId" component={Playlist} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
