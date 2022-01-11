import { Form } from 'react-bootstrap'

export const Search = ({ search, setSearch })=> {

  return (
    <Form.Control 
      type='text' 
      placeholder='Search for description or catalog number' 
      value={search} onChange={(e) => setSearch(e.target.value)} 
      className='search-input'
    />
  );
}

// style

const resultsForm = {
  backgroundColor: '#f1f1f1', 
  padding: '12px', 
  borderRadius: '5px', 
  marginTop:'10px', 
  marginBottom: '10px'
}