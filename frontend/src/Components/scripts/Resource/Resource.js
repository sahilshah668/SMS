import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onFetchingResource } from "../../Redux/Resources/ResourceAction";
import { DATA_STATE } from "../../Redux/dataState";
class Resource extends Component {
  componentDidMount() {
    this.props.onFetchingResource();
  }
  render() {
    console.log(this.props.resource);
    const { dataState } = this.props.resource;
    if (
      dataState === DATA_STATE.NOT_INITIALIZED ||
      dataState === DATA_STATE.FETCHING
    ) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CircularProgress />
            </div>
          </div>
        </div>
      );
    } else if (dataState === DATA_STATE.FETCH_FAILED) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Typography variant="h4">
                Something went wrong,please try again later.
              </Typography>
            </div>
          </div>
        </div>
      );
    } else {
      const { resources } = this.props.resource;
      if (resources.length > 0) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
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
                 </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="h4">
                  No resource found please start adding one.
                </Typography>
              </div>
            </div>
          </div>
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
