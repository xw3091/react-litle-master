import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import AA from './components/a'
import BB from './components/b'
import CC from './components/c'
import DD from './components/d'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route ref='aa' exact path='/' component={AA} />
                    <Route path='/login' component={BB} />
                    <Route path='/register' component={CC} />
                    <Route path='/redux' component={DD} />
                    <Redirect to='/login'/>
                </Switch>
            </Router>
        )
    }
}

export default App
