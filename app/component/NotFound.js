import React from 'react'
import img from '../public/img/not.png'

export default class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <div className="logo">
          <p>OOPS! - Could not Find it</p>
          <img src={img} />
          <div className="sub">
            <p><a href="#">Back</a></p>
          </div>
        </div>
      </div>
    )
  }
}
