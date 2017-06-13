import React from 'react'
import App from '../component/App'
import Signup from '../component/Signup'
import Signin from '../component/Signin'
import NotFound from '../component/NotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  )
}
