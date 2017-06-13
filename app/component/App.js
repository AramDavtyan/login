import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Dropdown, Menu, Container, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      access_token: null
    }
  }

  fade(element) {
    var op = 800;
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
    }, 50);
  }

  componentDidMount() {
    console.log(this.props.location)
    //if (this.props.location.response) this.setState({ access_token: this.props.location.response.ACCESS_TOKEN })
    if (this.props.location.query) {
      let htmlElement = ReactDOM.findDOMNode(document.querySelector('.ui.success.message'));
      this.fade(htmlElement)
    }
  }

  response() {
    if (this.props.location.query) {
      return <Message
        success
        header='Your user registration was successful'
        content={this.props.location.query}
      />
    }
  }

  render() {
    return (
      <Container>
        <Menu size='large'>
          <Menu.Item name='home' />

          <Menu.Menu position='right'>
            <Dropdown item text='Profil'>
              <Dropdown.Menu>
                <Link className='item' to={{ pathname: '/signup', search: '', hash: '', key: 'abc123', state: this.state }}>Sign-up</Link>
                <Link className='item' to='/signin'>Sign-in</Link>
                <Link className='item' to='/logout'>Logout</Link>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
        </Menu>
        <div>
          {this.response()}
        </div>
      </Container>
    )
  }
}
