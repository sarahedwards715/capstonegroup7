import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Landing from './views/Landing'
import Browse from './views/Browse';
import Playlist from './views/Playlist';
import NotFound from './views/NotFound';
import Mood from './views/Mood';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <div className="App">
      Hello From App Wrapper
      <Navigation />
      <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route exact path = '/browse' component = {Browse} />
        <Route path = '/browse/:mood' component = {Mood} />
        <Route exact path = '/playlist/:playlistId' component = {Playlist} />
        <Route path = '*' component = {NotFound} />
      </Switch>
    </div>
  );
}

export default App;
