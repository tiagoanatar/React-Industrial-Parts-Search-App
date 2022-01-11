import { useState, useEffect } from 'react'
import { Navbar, Nav, Modal, Button } from 'react-bootstrap'

function AboutModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          About
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Why Choose Wolters Motors & Drives as your Electric Motor Distributor?</h5>
        <p>
        For over 55 years, Wolters Motors and Drives has provided a one-stop solution for electric pump 
        motors, variable speed drives, bearings, gearboxes, power transmission components, inverter 
        duty motors, farm duty motors, and accessories.

        We can assure that you get the right motor package for your particular application. 
        Our sales engineers have over 60 years of combined experience in meeting the requirements 
        of our industrial customers, motor shops, OEMs, and government buyers. We offer motors and 
        controls for all industrial and process applications. Our strong relationship and sales volumes 
        with our top tier suppliers allow us to provide you great pricing along with the high level of 
        customer service customers have come to rely on.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const Header = ()=> {

  const [aboutmodalShow, aboutsetModalShow] = useState(false)

  return (
    <>
      <AboutModal
        show={aboutmodalShow}
        onHide={() => aboutsetModalShow(false)}
      />

      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' style={{marginBottom:'15px'}}>

        <Navbar.Brand href='#home'>Wolters</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Nav.Link href='#pricing' onClick={() => aboutsetModalShow(true)}>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
 
      </Navbar>
    </>
    );
  }