import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import Button from '@components/Buttons/Button';
import InputText from '@components/Inputs/InputText';
import H1 from '@components/Texts/H1';
import Label from '@components/Texts/Label';
import LinkDecorate from '@components/Texts/LinkDecorate';

import withAuthContainer from '@containers/AuthContainer';
import classes from './Auth.scss';

@withAuthContainer
class Auth extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSignup = () => {
    const { login, signup } = this.props;
    signup(this.state);
  };

  render() {
    const { isRequesting, login, signup } = this.props;
    return (
      <div className={classes.root}>
        <H1>Sign Up</H1>
        <div className={classes.rowText}>
          <Label className={classes.label}>Email</Label>
          <InputText className={classes.input} onChange={this.handleChangeEmail} />
        </div>
        <div className={classes.rowText}>
          <Label className={classes.label}>Password</Label>
          <InputText className={classes.input} onChange={this.handleChangePassword} />
        </div>
        <div className={classes.rowText}>
          <Label className={classes.label}>Password Confirmation</Label>
          <InputText className={classes.input} onChange={this.handleChangePassword} />
        </div>
        <Button className={classes.button} onClick={this.handleSignup}>
          Sign up
        </Button>

        <span>Do you have an account?</span>
        <LinkDecorate to="/auth/login">Login</LinkDecorate>
      </div>
    );
  }
}

Auth.propTypes = {};

Auth.defaultProps = {};

export default hot(module)(Auth);
