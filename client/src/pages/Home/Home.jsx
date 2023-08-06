import React,{ useEffect, useState } from 'react'
import './home.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Add';
import Dropdown from 'react-bootstrap/Dropdown';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router-dom'; 
import Tables from '../../components/Tables/Tables';
import { Spinner } from '../../components';

const Home = () => {
  const navigate = useNavigate();
  const [ showSpin, setShowSpin ] = useState(true);
  useEffect(()=> {
    setTimeout(()=> {
        setShowSpin(false)
    },1200)
  },[])
  return (
    <>
      <div className="container">
        <div className="main_div">
          {/* search and adduser btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={() => navigate('/register')}><AddIcon />&nbsp;Add User</Button>
            </div>
          </div>
          {/* exportcsv, gender, status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn'>Export To CSV</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={'radio'}
                    label={`All`}
                    name='All'
                    value='All'
                    defaultChecked
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Male`}
                    name='gender'
                    value='Male '
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Female`}
                    name='gender'
                    value='Female'
                  />
                </div>
              </div>
            </div>
            {/* sort by value */}
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <SortIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >New</Dropdown.Item>
                  <Dropdown.Item >Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={'radio'}
                    label={`All`}
                    name='status'
                    value='All'
                    defaultChecked
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Active`}
                    name='status'
                    value='Active'
                  />
                  <Form.Check
                    type={'radio'}
                    label={`InActive`}
                    name='status'
                    value='InActive'
                  />
                </div>
              </div>
            </div>
          </div>
          {showSpin?<Spinner/>:<Tables />}
        </div>
      </div>
    </>
  )
}

export default Home