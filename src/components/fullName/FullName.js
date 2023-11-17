import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

function FullName({ firstName, middleName, lastName, preferredName }) {
  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [pName, setPName] = useState("");

  console.log(firstName, middleName, lastName, preferredName);

  useEffect(() => {
    if (firstName) {
      setFName(firstName);
    }
    if (middleName) {
      setMName(middleName);
    }
    if (lastName) {
      setLName(lastName);
    }
    if (preferredName) {
      setPName(preferredName);
    }
  }, [firstName, middleName, lastName, preferredName]);

  return (
    <Row>
      <Col xs={6} md={3}>
        <div className="name-label">First Name</div>
        <div className="name-value">{fName}</div>
      </Col>
      {!!mName && (
        <Col xs={6} md={3}>
          <div className="name-label">Middle Name</div>
          <div className="name-value">{mName}</div>
        </Col>
      )}

      <Col xs={6} md={3}>
        <div className="name-label">Last Name</div>
        <div className="name-value">{lName}</div>
      </Col>
    </Row>
  );
}

export default FullName;
