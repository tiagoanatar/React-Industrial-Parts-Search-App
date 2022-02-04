import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { dataFinal } from './data/data'
import { Container, Row, Col } from 'react-bootstrap';
import { Search } from './components/Search'
import { Header } from './components/Header'
import { QuoteForm } from './components/QuoteForm'
import { PartsTable } from './components/PartsTable'
import { PartsPagination } from './components/Pagination'

function App() {

  // data source load
  const [data, setData] = useState(dataFinal)

  // form search control
  const [search, setSearch] = useState(undefined)

  // select parts data
  const [parts, setParts] = useState([])

  // pagination
  const pageMultiplier = 50

  const [pages, setPages] = useState({prev: 0, next: pageMultiplier})

  function changePage(index){
    setPages({prev: index-pageMultiplier, next: index})
  }

  useEffect(() => {
    setPages({prev: 0, next: pageMultiplier})
  },[])

  return (
    <>
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
              pages={pages} 
            />
          </Col>
          <Col sm={3}>
            <QuoteForm 
              parts={parts} 
              setParts={setParts} 
            />
          </Col>
        </Row>
        <Row>
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
