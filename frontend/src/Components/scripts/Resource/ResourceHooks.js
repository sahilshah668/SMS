import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { onFetchingResource ,EditResource} from "../../Redux/Resources/ResourceAction";
import { DATA_STATE } from "../../Redux/dataState";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";

export default function ResourceHooks() {
const [show,onShow] = useState(false)
const [reso,onResource] = useState(null)
  const resources = useSelector((state) => state.resource);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("im running");
    dispatch(onFetchingResource());
  }, []);

  const onDelete = (id) => {
        console.log(id)
  }

  const onUpdate = (resource) => {
    // console.log(resource)
    // onShow(true)
    // onResource(resource)
    resource.title = 'title'
    dispatch(EditResource(resource))
  }

  const onEdit = (resource) => {

  }

  return (
    <React.Fragment>
      {resources.dataState === DATA_STATE.FETCH_SUCCESS ? (
        <React.Fragment>
          {resources.resources.map((resource) => (
            <div className="col-md-4" key={resource._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{resource.title}</Typography>
                  <Typography variant="h5">{resource.subject}</Typography>
                  <Typography variant="h5">{resource.description}</Typography>
                  <Typography variant="h5">{resource.class}</Typography>
                  <Typography variant="h5">{resource.board}</Typography>
                </CardContent>
                <CardActionArea>
                    <Button onClick={() => onDelete(resource._id)}>Delete</Button>
                    <Button onClick={() => onUpdate(resource)} >Update</Button>

                </CardActionArea>
              </Card>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <Typography>Resources Loading</Typography>
      )}
    </React.Fragment>
  );
}
