import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onFetchingResource } from "../../Redux/Resources/ResourceAction";
import { DATA_STATE } from "../../Redux/dataState";
import Drawer from "../../reuseable/Drawer";
class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalResource: null,
      searchQuery:''
    };
  }

  componentDidMount() {
    this.props.onFetchingResource();
  }


  onHandleChange = (e) => {
    let query = e.target.value
    console.log(query)
    if(query.length == 0) {
      this.setState({
        finalResource:null
      })
    }
    this.setState({
      searchQuery:query
    })
    console.log(this.props.resource.resources)
    let filteredArray = this.props.resource ? this.props.resource.resources.filter(val => {
      console.log(val.title.toLowerCase() == query.toLowerCase())
      let contentQuery = val.title.toLowerCase()
      return contentQuery.indexOf(query) !== -1
    }) : []

    console.log(filteredArray)

  this.setState({
    finalResource:filteredArray
  })

  }

  render() {
    console.log(this.props.resource);
    console.log(this.state.finalResource);
    const { dataState } = this.props.resource;
    if (
      dataState === DATA_STATE.NOT_INITIALIZED ||
      dataState === DATA_STATE.FETCHING
    ) {
      return (
        <Drawer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <CircularProgress />
              </div>
            </div>
          </div>
        </Drawer>
      );
    } else if (dataState === DATA_STATE.FETCH_FAILED) {
      return (
        <Drawer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="h4">
                  Something went wrong,please try again later.
                </Typography>
              </div>
            </div>
          </div>
        </Drawer>
      );
    } else {
      const { resources } = this.props.resource;
      if (resources.length > 0) {
        return (
          <Drawer>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                <TextField id="standard-basic" label="Standard" value={this.state.searchQuery} onChange={this.onHandleChange} />
                  <div className="row">
                    {this.state.finalResource ? (
                      <React.Fragment>
                        {this.state.finalResource.map(val => (<div >
                          <Card>
                            <CardContent>
                              <Typography variant="h5">
                                {val.title}
                              </Typography>
                              <Typography variant="h5">
                                {val.subject}
                              </Typography>
                              <Typography variant="h5">
                                {val.description}
                              </Typography>
                              <Typography variant="h5">
                                {val.class}
                              </Typography>
                              <Typography variant="h5">
                                {val.board}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div> ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {resources.map(resource => (
                        <div className="col-md-4" key={resource._id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h5">
                                {resource.title}
                              </Typography>
                              <Typography variant="h5">
                                {resource.subject}
                              </Typography>
                              <Typography variant="h5">
                                {resource.description}
                              </Typography>
                              <Typography variant="h5">
                                {resource.class}
                              </Typography>
                              <Typography variant="h5">
                                {resource.board}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                        ))}
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        );
      } else {
        return (
          <Drawer>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Typography variant="h4">
                    No resource found please start adding one.
                  </Typography>
                </div>
              </div>
            </div>
          </Drawer>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    resource: state.resource,
  };
}

export default connect(mapStateToProps, { onFetchingResource })(
  withRouter(Resource)
);
