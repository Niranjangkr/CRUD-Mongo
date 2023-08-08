import React from 'react'
import Spinnner from 'react-bootstrap/Spinner';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-item-center" style={{ width: '100%', height: '50vh'}}>
      <Spinnner animation="border" variant="info" />&nbsp;Loading...
    </div>
  )
}

export default Spinner