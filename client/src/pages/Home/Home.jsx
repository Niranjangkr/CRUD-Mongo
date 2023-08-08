import React,{ useContext, useEffect, useState } from 'react'
import './home.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Add';
import Dropdown from 'react-bootstrap/Dropdown';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router-dom'; 
import Tables from '../../components/Tables/Tables';
import { Spinner } from '../../components';
import { addData, updateData, deleteUser } from '../../components/context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import { getAllUser } from '../../services/Apis'
import Alert from 'react-bootstrap/Alert'
import { deleteSingleUser, searchData } from '../../services/Apis'

const Home = () => {
  const [searchedData, setSearchData ] = useState([]);
  const [ search, setSearch ] = useState('');
  const {delUser, setDelUser} = useContext(deleteUser);
  const {updateU, setUpdateUser } = useContext(updateData);
  const [ formData, setFormData ] = useState([])
  const { udata, setudata } = useContext(addData);
  const navigate = useNavigate();
  const [ showSpin, setShowSpin ] = useState(true);
  useEffect(()=> {
    setTimeout(()=> {
        setShowSpin(false)
    },1200)
  },[])

  // getting all user
  useEffect(() => {
    try {
      (async()=>{
        const data = await getAllUser();
        setFormData(data.data);
      })()
    } catch (error) {
      console.log(error)
    }
  },[udata])

  // deleteUser
  const handleDelete =  async(id) => {
    const data = await deleteSingleUser(id);
    if(data.status === 200){
      console.log(data, data.status);
      setDelUser(data.data);
      const udata = await getAllUser();
      setFormData(udata.data);
    }else{
      toast.error("Cant delete user try again later")
    }
  }

  // for search field 
  const fetchSearchData = async() => {
    const response = await searchData(search);
    setSearchData(response.data);
  }
  const prevData = async() => {
    const data = await getAllUser();
    setFormData(data.data);
    console.log(formData)
  }

  useEffect(() => {
    // make an api call 
    if(search.trim() != ''){
      const debounce = setTimeout(() => {
        console.log("hitting api") 
        fetchSearchData();
      }, 500)

      return () => clearTimeout(debounce);
    }
    if(search == ''){
      console.log("am in")
      prevData()
    }
  },[search])

  const handleSearch = async(e) =>{
    const { value } = e.target;
    setSearch(value)
  }
  return (
    <>
    {
      udata?(<Alert variant="success" onClose={() =>setudata("")} dismissible>{udata.fname.toUpperCase()} Successfully Added</Alert>)  :''
        ||
        updateU?(<Alert variant="primary" onClose={() =>setUpdateUser("")} dismissible>{updateU.fname.toUpperCase()} Successfully Updated</Alert>) : ''
        ||
        delUser?(<Alert variant="danger" onClose={() =>setDelUser("")} dismissible>{delUser.fname.toUpperCase()} User Deleted</Alert>) : ''
      
    }
      <div className="container">
        < div className="main_div">
          {/* search and adduser btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearch}
                  // value={search}
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
          {showSpin?<Spinner/>:<Tables data = {formData} handleDelete ={handleDelete} searchedData = {searchedData}/>}
        </div>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {/* <>
        {
          formData.map((ele) => <div>{ele}</div>)
        }
      </> */}
    </>
  )
}

export default Home