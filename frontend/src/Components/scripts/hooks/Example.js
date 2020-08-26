import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

function Example() {
  const [show, onShow] = useState(false);
  const [name, onName] = useState("");
  const [email, onEmail] = useState("");
 
  const onclickofShow = () => {
    onShow(!show);
  };

  const onNameChange = (e) => {
    onName(e.target.value);
  };

  const onEmailChange = (e) => {
      onEmail(e.target.value)
  }

  const onSubmit = () => {
      console.log(name,email)
  }

  // this.state = {
  //     show
  // name:''
  // }
  // this.setState({
  //     show:true false !this.state.show
  // })
  return (
    <div>
      <Button onClick={onclickofShow}>
        <h1>show me</h1>
      </Button>
      {show ? <h2>this os the content to be shown</h2> : null}
      <TextField type="text" value={name} name="name" onChange={e => onNameChange(e)}  />
      <TextField type="email" value={email} name="email" onChange={e => onEmailChange(e)}  />

    </div>
  );
}
export default Example;
