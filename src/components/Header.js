import { Container, Row, Col } from 'react-bootstrap';
import WolterLogo from '../assets/Wolters-Motors-Logo.png'
import ScriptTag from 'react-script-tag';
import { FaMobileAlt } from 'react-icons/fa';

export const PhoneTracking = ()=> {
  return (
    <ScriptTag isHydrating={true} type="text/javascript" src="//cdn.callrail.com/companies/168163266/93cacf6dd2ac7678bbfb/12/swap.js" />
  )
}

export const Header = ()=> {
  return (
    <>
      <Container style={{borderBottom: '2px solid #ccc'}}>
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
            <PhoneTracking />
            <h5 style={{display: 'flex', alignItems: 'center', justifyContent: 'right'}}><FaMobileAlt /><a href="tel:8889658377">888-965-8377</a></h5>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-center">
          <Col sm={12} className="center-mobile" style={{padding: '25px'}}>
            <h4>Electric Motor Catalog & Request a Quote</h4>
            <p>Wolters maintains an inventory of electric motors in our Duluth, 
            GA warehouse and we offer over 20,000 electric motors from Baldor, 
            WEG, and Regal Beloit (Leeson, Marathon, Century).  If you need an 
            electric motor, you may search the catalog from these manufacturers 
            below using either the catalog number or description to narrow down 
            your options.  Once you find the desired part, click the “select part” 
            button to add it to your quote.</p>  <p>If you are unsure of the brand, description, 
            or part number, you may still use this page to send us a message or 
            share an image or specs sheet without selecting a part.  Our knowledgeable 
            sales team has the application experience to help you find the right motor 
            at the right price and get it to you quickly.</p>
          </Col>
        </Row>
      </Container>
    </>
    );
  }