import React, { useEffect, useState } from 'react'
import './register.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '../../components';

const Register = () => {
  const [ showSpin, setShowSpin ] = useState(true);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    gender: '',
    location: ''
  });
  const [status, setStatus] = useState('Active');
  const [image, setImgae] = useState('');
  const [preview, setPreview] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleStatus = (e) => {
    setStatus(e.value);
  }

  const handleFile = (e) => {
    console.log(e)
    setImgae(e.target.files[0]);
  }

  // setting profile image on updatate
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(()=> {
      setShowSpin(false)
  },1200)
  }, [image]);

  // on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = formData
    if (fname === ''){
      toast.error("Name is required");
    }else if (lname === ''){
      toast.error("Last Name is required");
    }else if(!email.includes("@")){
      toast.error("Enter a valid email");
    }else if(mobile === ''){
      toast.error("Mobile is required");
    }else if(mobile.length > 10 || mobile.length < 10){
      toast.error("Enter a valid Number!!");
    }else if(gender === ''){
      toast.error("Gender is required");
    }else if(location === ''){
      toast.error("location is required");
  }else if(status === ''){
    toast.error("status is required");
  }else if(image === ''){
    toast.error("Profile is required");
  }else{
    toast.success("Registration is successful")
  }
}

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  return (
    <>
    {
      showSpin? <Spinner />:
      <div className="container">
      <h2 className='text-center mt-1'>Register Your Self  </h2>
      <Card className='shadow mt-3 p-3'>
        <div className="profile_div text-center ">
          <img src={preview ? preview : `/R.png`} alt="image" />
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='fname' onChange={handleChange} value={formData.fname} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail"  >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='lname' onChange={handleChange} value={formData.lname} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' onChange={handleChange} value={formData.email} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name='mobile' onChange={handleChange} value={formData.mobile} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6  " controlId="formBasicEmail">
              <Form.Label>Select Your Gender</Form.Label>
              <Form.Check
                type={'radio'}
                label={`Male`}
                name='gender'
                value='Male'
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              <Form.Check
                type={'radio'}
                label={`Female`}
                name='gender'
                value='Female'
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6  " controlId="formBasicEmail">
              <Form.Label>Select Youor Status</Form.Label>
              <Select
                name='status'
                options={options}
                onChange={handleStatus}
                value={status}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your Profile</Form.Label>
              <Form.Control type="file" name='user_profile' onChange={handleFile} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Enter Your location</Form.Label>
              <Form.Control type="text" name='location' onChange={handleChange} value={formData.location} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer
        position="top-right"
      />
    </div>
    }
    
    </>
  )
}

export default Register