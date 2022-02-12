import { Container, Row, Col } from 'react-bootstrap';
import WolterLogo from '../assets/Wolters-Motors-Logo.png'

export const Header = ()=> {
  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col sm={5} className="center-mobile">
            <a href="https://www.woltersmotors.com/">
              <img  
                src={WolterLogo} 
                width='100%' 
                alt='Wolter Motors Logo' 
              />
            </a>
          </Col>
          <Col className="right-align">
            <h5><a href="tel:8446863663">888-WOLTERS</a></h5>
          </Col>
        </Row>
      </Container>
    </>
    );
  }