import { Container, Row, Col } from 'react-bootstrap';
import WolterLogo from '../assets/footer-logo-1.png'
import FaceIc from '../assets/face-ic.jpg'
import LinkIc from '../assets/linke-ic.jpg'
import Easa from '../assets/EASA-.jpg'

export const Footer = ()=> {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col sm={2}>
            <a href="https://www.woltersmotors.com/">
              <img  
                src={WolterLogo} 
                width='100%' 
                alt='Wolter Motors Logo' 
              />
            </a>
          </Col>
          <Col sm={2}>
            <h6>About Us</h6>
            <ul>
              <li><a href="https://www.woltersmotors.com/about-us/">About Us</a></li>
              <li><a href="https://www.woltersmotors.com/blog/">Wolters Street Journal</a></li>
              <li><a href="https://www.woltersmotors.com/contact-us/">Contact Us</a></li>
              <li><a href="https://www.woltersmotors.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="https://www.woltersmotors.com/request-a-quote/">Request a quote</a></li>
              <li><a href="https://www.woltersmotors.com/downloads/">Resources</a></li>
              <li><a href="https://www.woltersmotors.com/sitemap/">Sitemap</a></li>
            </ul>
          </Col>
          <Col sm={2}>
            <h6>Quick Links</h6>
              <ul>
                <li><a href="https://www.woltersmotors.com/motors/">Motors</a></li>
                <li><a href="https://www.woltersmotors.com/drives-and-soft-starts/">Drives and Soft Starts</a></li>
                <li><a href="https://www.woltersmotors.com/power-transmission/gear-reducers/">Gear Products &#038; Gear Reducers</a></li>
                <li><a href="https://www.woltersmotors.com/power-transmission/">Power Transmission</a></li>
                <li><a href="https://www.woltersmotors.com/harmonics-cmc/">Harmonics &#038; CMC</a></li>
                <li><a href="https://www.woltersmotors.com/manufacturers/">Manufacturers</a></li>
                <li><a target="_blank" rel="noopener" href="https://www.woltersmotors.com/wp-content/uploads/2021/11/WOLTERS-TERMS-AND-CONDITIONS-TM-11-6.pdf">Terms and Conditions</a></li>
              </ul>
          </Col>
          <Col sm={3}>
            <h6>Contact Us</h6>
            <p><strong>Wolters Motors &amp; Drives</strong><br />
            2875 North Berkeley Lake Dr. Suite # 1<br />
            Duluth, GA 30096</p>
            <p>1-888-965-8377<br />
            Tel (678) 417-5830<br />
            Fax (678) 417-5825</p>
          </Col>
          <Col sm={3}>
            <h6>Follow us</h6>
            <p>
              <a href="https://www.facebook.com/woltersmotors1/" >
                <img  
                  src={FaceIc} 
                  alt='' 
                />
              </a>
              <a href="https://www.linkedin.com/company/wolters-motors-&#038;-drives/about/">
                <img  
                  src={LinkIc}  
                  alt='' 
                />
              </a>
            </p>
						<img  
              src={Easa} 
              alt='' 
            />
										
          </Col>
        </Row>
      </Container> 
    </div>
    );
  }