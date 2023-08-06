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


const Tables = () => {
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
                <tr>
                  <td>1</td>
                  <td>Niranjan</td>
                  <td>niran@gmail.com</td>
                  <td>M</td>
                  <td className='d-flex align-items-center'>
                    <Dropdown className='text-center'>
                      <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                        <Badge className='bg-primary'>
                          Active
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
                    <img src="/R.png" alt="" />
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
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </div>
  )
}

export default Tables