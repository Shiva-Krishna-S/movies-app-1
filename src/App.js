import {Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
  </Switch>
)

export default App