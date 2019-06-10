import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginView from "./LoginView";
import { login, loginError } from "../../store/actions";

export default compose(
  connect(
    state => ({
      isLoading: state.login.isLoading,
      isAuthenticated: state.login.isAuthenticated,
      error: state.login.error
    }),
    { login, loginError }
  ),
  withRouter,
  withState("nameValue", "setNameValue", ""),
  withState("usernameValue", "setUsernameValue", ""),
  withState("passwordValue", "setPasswordValue", ""),
  withHandlers({
    handleInput: props => (e, input = "login") => {
      if (props.error) {
        props.loginError(props.error);
      }

      if (input === "username") {
        props.setUsernameValue(e.target.value);
      } else if (input === "password") {
        props.setPasswordValue(e.target.value);
      } else if (input === "name") {
        props.setNameValue(e.target.value);
      }
    },
    handleLoginButtonClick: props => () => {
      props.login(props.usernameValue, props.passwordValue);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPasswordValue("");
      }
    }
  })
)(LoginView);
