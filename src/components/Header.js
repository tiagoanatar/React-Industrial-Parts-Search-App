import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WolterLogo from '../assets/Wolters-Motors-Logo.png'

export const Header = ()=> {

  const [aboutmodalShow, aboutsetModalShow] = useState(false)

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col sm={5}>
            <img  
              src={WolterLogo} 
              width='500px' 
              alt='Wolter Motors Logo' 
            />
          </Col>
          <Col sm={7} style={{textAlign: 'right'}}>
            <h5><a href="tel:8446863663">888-WOLTERS<br />
            REQUEST A QUOTE</a></h5>
          </Col>
        </Row>
      </Container>
    </>
    );
  }