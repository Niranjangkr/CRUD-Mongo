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
import { NavLink } from 'react-router-dom'
import { updateUserStatus, getAllUser } from '../../services/Apis'
import { toast } from 'react-toastify'

const Tables = ({ data, handleDelete, searchedData, getUser }) => {

  const handleClick = async (id, Status) => {
      const response = await updateUserStatus(id, Status);  
      if(response.status === 200){
        getUser();
        toast.success ("status updated")
      }else(
        toast.error("Error updating status")
      )
  }
  // data.map(ele => console.log(ele.fname))
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
                { searchedData && searchedData.length > 0?
                <td>searcheddata</td>:
                  data&&data.length > 0?
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
                              <Dropdown.Item onClick={() => handleClick(ele._id, "Active")}>Active</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleClick(ele._id, "InActive")}>InActive</Dropdown.Item>
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
                             <Dropdown.Item ><NavLink to={`/userprofile/${ele._id}`} className="text-decoration-none"><VisibilityIcon style={{ color: 'green' }} />&nbsp;View</NavLink></Dropdown.Item>
                              <Dropdown.Item ><NavLink to={`/edit/${ele._id}`} className="text-decoration-none"><EditIcon style={{ color: 'blue' }} />&nbsp;Edit</NavLink></Dropdown.Item>
                              <Dropdown.Item onClick={() =>handleDelete(ele._id)}><DeleteIcon style={{ color: 'red' }} />&nbsp;Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    )
                  }): < tr className='no_data text-center'><td>No Data Found</td></tr>
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