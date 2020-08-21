import React, { Component } from "react";
import { Card, CardContent, TextField, Button, Grid } from "@material-ui/core";
export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password:''
    }
  }


  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  _onSubmit = () => {
    const {email,password} = this.state
    console.log(email,password)
  }

  render() {
    const {email,password} = this.state
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
                        <TextField variant="standard" label="email" type="email" onChange={this._onHandleChange} value={email} name="email" />
                        <TextField variant="standard" label="password" type="password" onChange={this._onHandleChange} value={password} name="password" />

                        <Button className="mt-3" variant="contained" color="primary" onClick={this._onSubmit}>
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
