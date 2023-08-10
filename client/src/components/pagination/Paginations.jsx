import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({setPage, page, count, pageCount, handleNext, handlepre}) => {
  return (
    <div className="pagination_div d-flex justify-content-end mx-5 ">
      <Pagination>
        <Pagination.Prev onClick={handlepre}/>
        {
          Array(pageCount).fill(null).map((ele, index) => {
            return <Pagination.Item key={index} onClick={() => setPage(index + 1)} active={page === index + 1?true: false}>{index + 1}</Pagination.Item>
          })
        }
        <Pagination.Next onClick={handleNext}/>
      </Pagination>
    </div>
  )
}

export default Paginations