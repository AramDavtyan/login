import React from 'react'
import { connect } from 'react-redux'
import login from '../actions/signin'
import { Redirect } from 'react-router'
import { Button, Checkbox, Form, Container, Header, Message } from 'semantic-ui-react'

@connect(
  (state) => ({}),
  (dispatch) => (login(dispatch))
)
export default class Signin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: '',
        password: ''
      },
      error: {
        email: '',
        password: '',
        other: '',
      },
      loading: false,
      redirect: false,
      userResponse: null
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    })
    this.props.login(this.state.form).payload.then(res => {
      if (!res.ACCESS_TOKEN) {
        for (let err of res) {
          this.setState({
            error: {
              ...this.state.error,
              other: err.error,
              [err.path]: err.message
            }
          })
        }
        this.setState({
          loading: false
        })
      } else {
        this.setState({
          loading: false,
          redirect: true,
          userResponse: res
        })
      }
    })
  }


  handleChange(event) {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value },
      error: { ...this.state.error, [event.target.name]: '', other: '' }
    })
  }

  handleError() {
    if (this.state.error.other) {
      return <Message
        error
        header='Unauthorized'
        content='login or password is in correct'
      />
    }
  }


  render() {
    if (this.state.redirect) return <Redirect to={{ pathname: '/', query: 'You may now log-in', state: this.state.userResponse }} />
    return (
      <Container text>
        <Header dividing className='reg' textAlign='center' as='h2'>Login</Header>
        <Form loading={this.state.loading} error onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field error={!!this.state.error.email}>
            <label>Email</label>
            <input onChange={this.handleChange.bind(this)} name='email' type='email' placeholder='Email' />
            <span>{this.state.error.email}</span>
          </Form.Field>
          <Form.Field error={!!this.state.error.password}>
            <label>Pasword</label>
            <input onChange={this.handleChange.bind(this)} name='password' type='password' placeholder='Password' />
            <span>{this.state.error.password}</span>
          </Form.Field>
          {this.handleError()}
          <Button type='submit'>Login</Button>
        </Form>
      </Container>
    )
  }
}
