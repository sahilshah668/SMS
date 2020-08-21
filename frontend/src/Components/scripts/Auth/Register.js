import React, { Component } from "react";
import { Card, CardContent, TextField, Button, Grid } from "@material-ui/core";
import {connect} from 'react-redux'
import {onRegister} from '../../Redux/Authentication/AuthAction'
import { withRouter } from "react-router-dom";
 class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      branch: "",
      email: "",
      password: "",
    };
  }

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const { email, password,branch,name } = this.state;
    const newObj = {
      name,
      email,
      password,
      branch
    }

    this.props.onRegister(newObj,this.props.history)
  };

  render() {
    const { email, password ,branch,name} = this.state;
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
                      label="name"
                      type="text"
                      onChange={this._onHandleChange}
                      value={name}
                      name="name"
                    />

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
                      label="branch"
                      type="text"
                      onChange={this._onHandleChange}
                      value={branch}
                      name="branch"
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


export default connect(null,{onRegister}) (withRouter(Register))