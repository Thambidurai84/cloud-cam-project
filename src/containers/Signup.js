import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/contextLib";
import { useFormFields } from "../lib/hooksLib";
import { onError } from "../lib/errorLib";
import "./Signup.css";
import { getDefaultNormalizer } from "@testing-library/dom";
import axios from 'axios';

export default function Signup() {

  const [fields, handleFieldChange] = useFormFields({
    cameraname: "",
    cameraip: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("handlesubmit=>")

    setIsLoading(true);

    try {
      // const newUser = await Auth.signUp({
      //   username: fields.email,
      //   password: fields.password,
      // });
      // const newUser = {
      //    username: 'thambi',
      //    password: '12345',
      //  };
      let newUser;
      console.log("api called")
      axios.post('https://yfcnxwjcwd.execute-api.ap-south-1.amazonaws.com/dev', {
        cameraname: fields.cameraname,
        cameraip: fields.cameraip,
        username: fields.username,
        password: fields.password
      })
        .then(function (response) {
          console.log("response");
          newUser = {
            username: fields.username,
            password: fields.password,
          };
        })
        .catch(function (error) {
          console.log(error);
        });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      // await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      // await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          {/* <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          /> */}
          <Form.Text muted>User Registered successfully, Please Login.</Form.Text>
        </Form.Group>
        {/* <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton> */}
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cameraname" size="lg">
          <Form.Label>Camera Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.cameraname}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="cameraip" size="lg">
          <Form.Label>Camera IP</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.cameraip}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="username" size="lg">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Register
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {console.log("newUser=", newUser)}
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}