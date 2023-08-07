import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './table.css'
import { BASE_URL } from '../../services/helper'

const Tables = ({ data }) => {
  // data.map(ele => console.log(ele.fname))
  data.reverse();
  return (
    <div className="container">
      <Row>
        <div className="col mt-0">
          <Card className='shadow'>
            <Table className='align-items-center' responsive="sm">
              <thead className='thead-dark'>
                <tr className='table-dark'>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { data.length > 0?
                  data.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ele.fname} {ele.lname}</td>
                        <td>{ele.email}</td>
                        <td>{ele.gender[0]}</td>
                        <td className='d-flex align-items-center'>
                          <Dropdown className='text-center'>
                            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                              <Badge className={ele.Status==='Active'?'bg-primary':'bg-danger'}>
                                {ele.Status}
                                <KeyboardArrowDownIcon />
                              </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item >Active</Dropdown.Item>
                              <Dropdown.Item >InActive</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td className='img_parent'>
                          <img src={`${BASE_URL}/uploads/${ele.profile}`} alt="img" />
                        </td>
                        <td>
                          <Dropdown className='text-center'>
                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                              <MoreVertIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item ><VisibilityIcon style={{ color: 'green' }} />&nbsp;View</Dropdown.Item>
                              <Dropdown.Item ><EditIcon style={{ color: 'blue' }} />&nbsp;Edit</Dropdown.Item>
                              <Dropdown.Item ><DeleteIcon style={{ color: 'red' }} />&nbsp;Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    )
                  }): <div className='no_data text-center'>No Data Found</div>
                }

              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </div>
  )
}

export default Tables