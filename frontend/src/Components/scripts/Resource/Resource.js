import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
  CardActionArea,
  Button,
  Modal,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  onFetchingResource,
  EditResource,
  deleteResource
} from "../../Redux/Resources/ResourceAction";
import { DATA_STATE } from "../../Redux/dataState";
import Drawer from "../../reuseable/Drawer";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    width: 400,
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  containerModal: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalResource: null,
      searchQuery: "",
      open: false,
      board: "",
      subject: "",
      title: "",
      description: "",
      id: "",
      classs: "",
    };
  }

  OnDelete = (resource) => {
    console.log(resource);
    this.props.deleteResource(resource)
  };

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onEdit = (resource) => {
    console.log(resource);
    this.setState({
      open: !this.state.open,
      id: resource._id,
      title: resource.title,
      description: resource.description,
      board: resource.board,
      subject: resource.subject,
      classs: resource.class,
    });
  };

  onEditSubmit = () => {
    const { id, title, description, board, subject, classs } = this.state;
    console.log(id)
    let obj = {
      id,
      title,
      description,
      board,
      subject,
      class: classs,
    };

    this.props.EditResource(obj);
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
    this.props.onFetchingResource();
  }

  onHandleChange = (e) => {
    let query = e.target.value;
    console.log(query);
    if (query.length == 0) {
      this.setState({
        finalResource: null,
      });
    }
    this.setState({
      searchQuery: query,
    });
    console.log(this.props.resource.resources);
    let filteredArray = this.props.resource
      ? this.props.resource.resources.filter((val) => {
          console.log(val.title.toLowerCase() == query.toLowerCase());
          let contentQuery = val.title.toLowerCase();
          return contentQuery.indexOf(query) !== -1;
        })
      : [];

    console.log(filteredArray);

    this.setState({
      finalResource: filteredArray,
    });
  };

  render() {
    console.log(this.state.board);
    console.log(this.props.resource);
    console.log(this.state.finalResource);
    const { board, title, description, subject, classs } = this.state;
    const { classes } = this.props;
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
                  <TextField
                    id="standard-basic"
                    label="Standard"
                    value={this.state.searchQuery}
                    onChange={this.onHandleChange}
                  />
                  <div className="row">
                    {this.state.finalResource ? (
                      <React.Fragment>
                        {this.state.finalResource.map((val) => (
                          <div>
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
                              <CardActions>
                                <Button
                                  onClick={this.OnDelete.bind(this, val)}
                                  size="small"
                                >
                                  Delete
                                </Button>
                              </CardActions>
                              <CardActions>
                                <Button
                                  onClick={this.onEdit.bind(this, val)}
                                  size="small"
                                >
                                  Edit
                                </Button>
                              </CardActions>
                            </Card>
                          </div>
                        ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {resources.map((resource) => (
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
                              <CardActions>
                                <Button
                                  onClick={this.onEdit.bind(this, resource)}
                                  size="small"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={this.OnDelete.bind(this, resource)}
                                  size="small"
                                >
                                  Delete
                                </Button>
                              </CardActions>
                            </Card>
                          </div>
                        ))}
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.containerModal}>
                <Modal
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className={classes.paper}
                >
                  <div>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="classs"
                        value={classs}
                        onChange={(e) =>
                          this.setState({ classs: e.target.value })
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="board"
                        value={board}
                        onChange={(e) =>
                          this.setState({ board: e.target.value })
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="subject"
                        value={subject}
                        onChange={(e) =>
                          this.setState({ subject: e.target.value })
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="title"
                        value={title}
                        onChange={(e) =>
                          this.setState({ title: e.target.value })
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="description"
                        value={description}
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                      />
                      <Button
                        onClick={this.onEditSubmit.bind(this)}
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </form>
                  </div>
                </Modal>
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

export default connect(mapStateToProps, { onFetchingResource, EditResource ,deleteResource })(
  withStyles(useStyles)(withRouter(Resource))
);
