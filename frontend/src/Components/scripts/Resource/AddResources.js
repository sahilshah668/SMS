import React, { Component } from "react";
import { connect } from "react-redux";
import { onAddingResource } from "../../Redux/Resources/ResourceAction";
import { withRouter } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
class AddResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileSubmit = () => {
    this.props.onAddingResource(this.state.selectedFile);
  };

  render() {
    return (
      <div>
          {console.log(this.state.selectedFile)}
        {this.state.selectedFile ? (
          <div>
            <Typography variant="body2">{this.state.selectedFile.name}</Typography>
            <Button
              color="primary"
              size="large"
              variant="contained"
              component="label"
              onClick={this.onFileSubmit}
            >
              Submit
            </Button>
          </div>
        ) : (
          <Button
            color="primary"
            size="large"
            variant="contained"
            component="label"
          >
            Upload
            <input
              type="file"
              onChange={this.onFileChange}
              style={{ display: "none" }}
            />
          </Button>
        )}
      </div>
    );
  }
}

export default connect(null, { onAddingResource })(withRouter(AddResources));
