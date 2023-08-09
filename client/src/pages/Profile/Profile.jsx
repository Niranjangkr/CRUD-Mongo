import React, { useEffect, useState } from 'react'
import './profile.css'
import Card from 'react-bootstrap/Card'
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import Spinner from 'react-bootstrap/esm/Spinner';

const Profile = () => {
  const [ userData, setUserData ] = useState({})
  const [showSpin, setShowSpin] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    (async() => {
      const data = await getSingleUser(id);
      setUserData(data.data);
    })()
  }, []);
  let date = userData.dateCreated
  let updateDate = userData.dateUpdated
  console.log(updateDate)

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200)
  })
  return (
    <>
    {
      showSpin? <Spinner />:
      <div className="container">
      <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <div className="col">
            <div className="card-profile-stats d-flex justify-content-center">
                <img src={`${BASE_URL}/uploads/${userData.profile}`} alt="img" />
            </div>
          </div>
          <div className="text-center">
            <h3>{`${userData.fname} ${userData.lname}`}</h3>
            <h4><EmailIcon className='email'/>&nbsp;:-<span>{userData.email}</span></h4>
            <h4><SmartphoneIcon />&nbsp;:-<span>{userData.mobile}</span></h4>
            <h4><ManIcon />&nbsp;:-<span>{userData.gender}</span></h4>
            <h4><PlaceIcon className='location'/>&nbsp;:-<span>{userData.location}</span></h4>
            <h4>Status&nbsp;:-<span>{userData.Status}</span></h4>
            <h5><CalendarMonthIcon className='cal'/>&nbsp;Date Created&nbsp;:-<span>{date}</span></h5>
            <h5><CalendarMonthIcon className='cal'/>&nbsp;Date Updated&nbsp;:-<span>{updateDate?updateDate:"Not updated"}</span></h5>
          </div>
        </Card.Body>
      </Card>
    </div>
    }
    </>
  )
}

export default Profile