import 'bootstrap/dist/css/bootstrap.min.css';
import menuBar from './assets/bars-solid.svg';
import { useState, useEffect } from 'react';
import { dataFinal } from './data/data';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Search } from './components/Search';
import { Header } from './components/Header';
import { QuoteForm } from './components/QuoteForm';
import { PartsTable } from './components/PartsTable';
import { PartsPagination } from './components/Pagination';

function App() {

  // Data source load
  const [data] = useState(dataFinal)

  // Form search control
  const [search, setSearch] = useState(undefined)

  // Select parts data
  const [parts, setParts] = useState([])

  // Pagination
  const pageMultiplier = 50

  const [pages, setPages] = useState({prev: 0, next: pageMultiplier})

  function changePage(index){
    setPages({prev: index-pageMultiplier, next: index})
  }

  useEffect(() => {
    setPages({prev: 0, next: pageMultiplier})
  },[])

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a className="mobile-menu" onClick={handleShow}><img alt="Display form" src={menuBar} width="40px" height="40px" /></a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <QuoteForm 
            parts={parts} 
            setParts={setParts} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Header />
      <Container>
        <Row>
          <Col>
            <Search search={search} setSearch={setSearch} />
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <PartsTable 
              parts={parts} 
              setParts={setParts} 
              data={data} 
              search={search} 
              pages={pages} 
            />
          </Col>
          <Col sm={3} className="hide-mobile">
            <QuoteForm 
              parts={parts} 
              setParts={setParts} 
            />
          </Col>
        </Row>
        <Row className="hide-mobile">
          <Col>
            <PartsPagination 
              search={search} 
              data={data} 
              pageMultiplier={pageMultiplier} 
              changePage={changePage} 
            />
          </Col>
        </Row>
      </Container>
      <Container style={{textAlign: 'center', padding: '20px', borderTop: '3px solid #ccc'}}>
        <Row>
          <Col sm={12}>
            Wolters Motors & Drives, 2875 North Berkeley Lake Dr. Suite # 1, Duluth, GA 30096
            <br />
            1-844-383-2492 | Tel (678) 417-5830 | Fax (678) 417-5825
          </Col>
        </Row>
      </Container> 
    </>
  );
}

export default App;
