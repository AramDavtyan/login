import React from 'react'
import { Container, Button, Checkbox, Form, Header, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import create from '../actions/signup'

@connect(
  (state) => ({}),
  (dispatch) => (create(dispatch))
)
export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        firstname: '',
        lastname: '',
        login: '',
        email: '',
        password: '',
      },
      error: {
        firstname: '',
        lastname: '',
        login: '',
        email: '',
        password: '',
      },
      loading: false,
      errordefault: false,
      redirect: false
    }
  }

  handlSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true })
    this.props.create(this.state.form).payload.then(response => {
      setTimeout(() => {
        this.setState({
          loading: false
        })
        if (response.message) {
          this.setState({ redirect: true })
        } else {
          this.setState({ errordefault: true })
          for (let err of response) {
            this.setState({
              error: {
                ...this.state.error,
                [err.path]: err.message
              }
            })
          }
        }
      }, 1000)
    })
  }
  handlChange(event) {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
      error: {
        ...this.state.error,
        [event.target.name]: ''
      },
    })
  }
  render() {
    if (this.state.redirect) return <Redirect to={{ pathname: '/', query: 'You may now log-in with the username you have chosen'  }} />;
    return (
      <Container text>
        <Header dividing className='reg' textAlign='center' as='h2'>Registration</Header>
        <Form loading={this.state.loading} onSubmit={this.handlSubmit.bind(this)}>
          <Form.Field error={!!this.state.error.firstname}>
            <label htmlFor='firstName'>First Name</label>
            <input required type='text' name='firstname' onChange={this.handlChange.bind(this)} id="firstName" placeholder='First Name' />
            <span className='error'>{this.state.error.firstname.replace(/"firstname"/g, "First Name")}</span>
          </Form.Field>
          <Form.Field error={!!this.state.error.lastname}>
            <label htmlFor="lastName">Last Name</label>
            <input required type='text' name='lastname' onChange={this.handlChange.bind(this)} id="lastName" placeholder='Last Name' />
            <span className='error'>{this.state.error.lastname.replace(/"lastname"/g, "Last Name")}</span>
          </Form.Field>
          <Form.Field error={!!this.state.error.login}>
            <label htmlFor="login">Login</label>
            <input required type='text' name='login' onChange={this.handlChange.bind(this)} id="login" placeholder='Login' />
            <span className='error'>{this.state.error.login.replace(/"login"/g, "Login")}</span>
          </Form.Field>
          <Form.Field error={!!this.state.error.email}>
            <label htmlFor="email">Email</label>
            <input required type='email' name='email' onChange={this.handlChange.bind(this)} id="email" placeholder='Email' />
            <span className='error'>{this.state.error.email.replace(/"email"/g, "Email")}</span>
          </Form.Field>
          <Form.Field error={!!this.state.error.password}>
            <label htmlFor="password">Password</label>
            <input type='password' required name='password' onChange={this.handlChange.bind(this)} id="password" placeholder='Password' />
            <span className='error'>{this.state.error.password.replace(/"password"/g, "Passwword")}</span>
          </Form.Field>
          <Button primary type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}
