import React, { useContext, useEffect, useState } from 'react'
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
import { deleteSingleUser, exporttocsv } from '../../services/Apis'

const Home = () => {
  const [count, setCount] = useState("")
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("new");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");
  const [searchedData, setSearchData] = useState([]);
  const [search, setSearch] = useState('');
  const { delUser, setDelUser } = useContext(deleteUser);
  const { updateU, setUpdateUser } = useContext(updateData);
  const [formData, setFormData] = useState([])
  const { udata, setudata } = useContext(addData);
  const navigate = useNavigate();
  const [showSpin, setShowSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [])


  // deleteUser
  const handleDelete = async (id) => {
    const data = await deleteSingleUser(id);
    if (data.status === 200) {
      setDelUser(data.data);
      const udata = await getAllUser();
      setFormData(udata.data);
    } else {
      toast.error("Cant delete user try again later")
    }
  }


  // search and get all value
  const userget = async () => {
    const response = await getAllUser(search, gender, status, order, page);
    if (response.status === 200) {
      setFormData(response.data.Userdata);
      setPageCount(response.data.pagination.pageCount)
      setCount(response.data.pagination.count)
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    // make an api call 
    const debounce = setTimeout(() => {
      try {
        userget();
      } catch (error) {
        console.error(error);
      }
    }, 100);

    return () => clearTimeout(debounce);
  }, [search, gender, status, order, udata, page]);

  // export csv
  const exportuser = async () => {
    const response = await exporttocsv();
    if (response.status === 200) {
      window.open(response.data.downloadUrl);
    } else {
      toast.error("error!")
    }
  }

  // handleNext button and handlepre
  const handlepre = () => {
    setPage(()=> {
      if (page === 1){
        return page;
      }
      return page - 1;
    })
  }

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount){
        return page;
      };
      return page + 1;
    })
  }

  return (
    <>
      {
        udata ? (<Alert variant="success" onClose={() => setudata("")} dismissible>{udata.fname.toUpperCase()} Successfully Added</Alert>) : ''
          ||
          updateU ? (<Alert variant="primary" onClose={() => setUpdateUser("")} dismissible>{updateU.fname.toUpperCase()} Successfully Updated</Alert>) : ''
            ||
            delUser ? (<Alert variant="danger" onClose={() => setDelUser("")} dismissible>{delUser.fname.toUpperCase()} User Deleted</Alert>) : ''

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
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button className='export_btn' onClick={exportuser}>Export To CSV</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={'radio'}
                    label={`All`}
                    name='gender'
                    value={'All'}
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'All'}
                    // defaultChecked
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Male`}
                    name='gender'
                    value={'Male'}
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'Male'}
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Female`}
                    name='gender'
                    value={'Female'}
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'Female'}
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
                  <Dropdown.Item onClick={() => setOrder('new')} >New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setOrder('old')} >Old</Dropdown.Item>
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
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status == 'All'}
                    // defaultChecked
                  />
                  <Form.Check
                    type={'radio'}
                    label={`Active`}
                    name='status'
                    value='Active'
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status == 'Active'}
                  />
                  <Form.Check
                    type={'radio'}
                    label={`InActive`}
                    name='status'
                    value='InActive'
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status == 'InActive'}
                  />
                </div>
              </div>
            </div>
          </div>
          {showSpin ? <Spinner /> : <Tables
            page={page}
            data={formData}
            getUser={userget}
            handleDelete={handleDelete}
            searchedData={searchedData}
            count={count}
            pageCount={pageCount}
            handleNext={handleNext}
            handlepre={handlepre}
            setPage={setPage}
          />}
          {/* <div className='p-4 d-flex justify-content-center'>
            <button onClick={() => setPage(prev => {
              return prev === 1 ? 1 : prev - 1;
            })}>-</button>
            <button onClick={() => setPage(prev => prev + 1)}>+</button>
          </div> */}
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
      <ToastContainer />
    </>
  )
}

export default Home