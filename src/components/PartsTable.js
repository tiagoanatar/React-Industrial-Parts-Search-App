import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { PartItem } from './PartItem'

export const PartsTable = ({ parts, setParts, data, search, pages })=> {

  return (
    <>
      <Table striped bordered hover style={{tableLayout: 'fixed'}}>
        <thead>
          <tr>
            <th width='15%'>Manufacturer</th>
            <th width='22%'>Catalog Number</th>
            <th>Description</th>
            <th width='20%'>Select Part</th>
          </tr>
        </thead>
        <tbody>

          {/* search filter result */}
          {data.length > 0 && search !== undefined ? data.filter((item, index) => {
            if (item['Description']
                  .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                  .toLowerCase()
                  .includes(search.split(' ').join('').toLowerCase()) 
                  || item['Catalog or Item Number']
                  .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                  .toLowerCase()
                  .includes(search.split(' ').join('').toLowerCase())) 
                  {
                return true
              }
            }).slice(pages.prev,pages.next).map((item, index) => <PartItem key={index} item={item} parts={parts} setParts={setParts} />)
          : null}

          {data.length > 0 && search === undefined ? data.slice(pages.prev,pages.next).map((item, index) => <PartItem key={item["Catalog or Item Number"]} item={item} parts={parts} setParts={setParts} />) : null}

        </tbody>
      </Table>
      </>
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