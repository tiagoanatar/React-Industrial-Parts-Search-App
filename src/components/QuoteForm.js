import { useState, useEffect, useRef } from "react";
import { Form, Button, ListGroup, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { Loading } from "./Loading";
import easa from "../assets/EASA-.jpg";
import regal from "../assets/regal-beloit-logo-png-transparent.png";
import baldor from "../assets/baldor.png";
import weg from "../assets/weg.png";

export const QuoteForm = ({ parts, setParts }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    parts: [],
    file: "",
  });
  const validationMessage = useRef({
    name: "",
    email: "",
    company: "",
    message: "",
    parts: "",
    file: "",
    error: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData({ ...data, parts: [...parts] });
  }, [parts]);

  // Email js
  const form = useRef();

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(data.file);

    // name validation
    if (!data.name) {
      validationMessage.current = { ...validationMessage.current, name: "Please add a name", error: true }
    } else if (
      !data.name
        .split(" ")
        .join("")
        .match(/^[a-zA-Z]*$/)
    ) {
      validationMessage.current = { ...validationMessage.current, name: "Only letters", error: true }
    } else {
      validationMessage.current = { ...validationMessage.current, name: "", error: false }
    }

    // mail validation
    if (!data.email) {
      validationMessage.current = { ...validationMessage.current, email: "Please add a email", error: true }
    } else if (data.email) {
      let lastAtPos = data.email.lastIndexOf("@");
      let lastDotPos = data.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          data.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          data.email.length - lastDotPos > 2
        )
      ) {
        validationMessage.current = { ...validationMessage.current, email: "Email is not valid", error: true }
      } else {  
        validationMessage.current = { ...validationMessage.current, email: "", error: false }
      }
    }

    if (!data.company) {
      validationMessage.current = { ...validationMessage.current, company: "Please add a company", error: true }
    } else {
      validationMessage.current = { ...validationMessage.current, company: "", error: false }
    }

    if (!data.message) {
      validationMessage.current = { ...validationMessage.current, message: "Please add a message", error: true }
    } else {
      validationMessage.current = { ...validationMessage.current, message: "", error: false }
    }

    setData({ ...data, parts: parts });

/*     if (data.parts.length === 0) {
      validationMessage.current = { ...validationMessage.current, parts: "Please select the parts", error: true }
    } else {
      validationMessage.current = { ...validationMessage.current, parts: "", error: false }
    } */

    if (!validationMessage.current.error){
      //activate loading
      setLoading(true);

      //EmailJS function
      sendEmail(e);

      setData({
        name: "",
        email: "",
        company: "",
        message: "",
        parts: [],
        file: "",
      });
    }
  };

  // File Up-upload
  function onFileChange(e) {
    let files = e.target.files;
    if (files[0].size > 2097152) {
      alert("Please upload up to 2mb image.");
      return;
    }
    //let fileReader = new FileReader();
    console.log(files[0]);
    setData({ ...data, file: files[0] });
  }

  //EmailJS function
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kt6k2qv",
        "template_ap5sznp",
        form.current,
        "user_gITlE5kyklllEkKNjkWmu"
      )
      .then(
        (result) => {
          console.log(result.text);
          window.location.replace(
            "https://www.woltersmotors.com/thank-you-catalog/"
          );
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <style type="text/css">
        {`
        .btn-wolter1 {
          background-color: #29a28b;
          color: white;
        }
        .btn-wolter1:hover {
          background-color: #04427d;
          color: white;
        }
        `}
      </style>
      {loading ? <Loading /> : null}
      <Form
        ref={form}
        onSubmit={onSubmit}
        style={{ backgroundColor: "#04348d", padding: "20px", color: "#fff" }}
      >
        <h5>Request a Quote</h5>
        <Form.Group className="mb-3" controlId="nameForm">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {validationMessage.current.name.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.name}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailForm">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {validationMessage.current.email.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.email}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="companyForm">
          <Form.Control
            type="text"
            placeholder="Company Name"
            name="company"
            value={data.company}
            onChange={(e) => setData({ ...data, company: e.target.value })}
          />
          {validationMessage.current.company.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.company}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="messageForm">
          <Form.Control
            as="textarea"
            placeholder="Message"
            name="message"
            rows={3}
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
          {validationMessage.current.message.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.message}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Group className="pictureForm" controlId="formFile">
          <Form.Control
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={(e) => onFileChange(e)}
          />
          {validationMessage.current.file.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.file}
            </Alert>
          ) : null}
        </Form.Group>
        <Form.Label column>Selected Parts</Form.Label>
        <ListGroup>
          {parts.map((item) => {
            return (
              <ListGroup.Item key={item + "a"}>
                {item}{" "}
                <button
                  className="remove-item"
                  onClick={() => {
                    const removedItem = parts.filter(
                      (subItem) => item !== subItem
                    );
                    setParts(removedItem);
                  }}
                >
                  X
                </button>
              </ListGroup.Item>
            );
          })}
          {validationMessage.current.parts.length > 0 ? (
            <Alert
              variant="danger"
              style={{ marginTop: "5px", padding: "5px", paddingLeft: "10px" }}
            >
              {validationMessage.current.parts}
            </Alert>
          ) : null}
        </ListGroup>
        <Form.Group
          className="mb-3"
          controlId="nameParts"
          style={{ display: "none" }}
        >
          <Form.Control
            type="text"
            placeholder="Parts"
            name="parts"
            value={parts}
            onChange={(e) => (e.target.value = parts)}
          />
        </Form.Group>
        <Button variant="wolter1" type="submit" style={{ marginTop: "15px" }}>
          Request Your Quote
        </Button>
      </Form>
      <div style={{ textAlign: "center" }}>
        <p>
          <img src={easa} alt="EASA Logo" width="220px" />
        </p>
        <p>
          <img src={regal} alt="Regal Logo" width="250px" />
        </p>
        <p>
          <img src={baldor} alt="Baldor Logo" width="220px" />
        </p>
        <p>
          <img src={weg} alt="WEG Logo" />
        </p>
      </div>
    </>
  );
};
