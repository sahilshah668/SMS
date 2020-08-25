import React, { Component } from "react";
import { Card, CardContent, TextField, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onLogin } from "../../Redux/Authentication/AuthAction";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const { email, password } = this.state;
    console.log(email, password);
    const newUser = {
      email,
      password,
    };
    this.props.onLogin(newUser, this.props.history);
  };

  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Card>
                <CardContent>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      variant="standard"
                      label="email"
                      type="email"
                      onChange={this._onHandleChange}
                      value={email}
                      name="email"
                    />
                    <TextField
                      variant="standard"
                      label="password"
                      type="password"
                      onChange={this._onHandleChange}
                      value={password}
                      name="password"
                    />

                    <Button
                      className="mt-3"
                      variant="contained"
                      color="primary"
                      onClick={this._onSubmit}
                    >
                      Login
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { onLogin })(withRouter(Login));
