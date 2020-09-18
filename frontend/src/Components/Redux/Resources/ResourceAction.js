import axios from "../../utils/axios";

export const RESOURCE_ACTION_TYPES = {
  FETCHING: "RESOURCES/FETCHING",
  RESOURCE_FETCH_SUCCESS: "RESOURCES/RESOURCE_FETCH_SUCCESS",
  RESOURCE_FETCH_FAILED: "RESOURCE/RESOURCE_FETCH_FAILED",
  RESOURCE_SEND_SUCCESS: "RESOURCE/RESOURCE_SEND_SUCCESS",
  RESOURCE_SEND_FAILED: "RESOURCE/RESOURCE_SEND_FAILED",
};

export const onFetching = () => {
  return {
    type: RESOURCE_ACTION_TYPES.FETCHING,
  };
};

export const resourceFetchSuccess = (data) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_FETCH_SUCCESS,
    payload: data,
  };
};

export const resourceFetchFailed = (error) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_FETCH_FAILED,
    payload: error,
  };
};

export const resourceSendSuccess = () => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_SEND_SUCCESS,
  };
};

export const resourceSendFailed = (error) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_SEND_FAILED,
    payload: error,
  };
};

export const onFetchingResource = () => {
  return (dispatch) => {
    dispatch(onFetching());
    axios
      .get("http://localhost:5000/admin/resource")
      .then((res) => {
        if (res.status === 200) {
          dispatch(resourceFetchSuccess(res.data));
        } else {
          dispatch(resourceFetchFailed(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const onAddingResource = (file, resourceData) => {
  

  let data = new FormData();
  data.append("resource", file);

  Object.keys(resourceData).forEach((key) => {
    data.append(key, resourceData[key]);
  });

  return (dispatch) => {
    axios
      .post(`http://localhost:5000/admin/resources`, data)
      .then((res) => {
        window.location.reload(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

};


export const EditResource = (resource) => {
  console.log(resource)
  return dispatch => {
    axios.put(`http://localhost:5000/admin/resource/${resource.id}`,resource)
     .then(res => {
       console.log(res)
     }).catch(err => {
       console.log(err)
     })
  }
}

export const deleteResource = (resource) => {
  console.log(resource)
  return dispatch => {
    axios.post(`http://localhost:5000/admin/resource/delete/${resource._id}`)
     .then(res => {
       console.log(res)
     }).catch(err => {
       console.log(err)
     })
  }
}


