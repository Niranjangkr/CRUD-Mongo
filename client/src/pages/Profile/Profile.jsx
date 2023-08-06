import React from 'react'
import './profile.css'
import Card from 'react-bootstrap/Card'
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Profile = () => {
  return (
    <>
      <div className="container">
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <div className="col">
              <div className="card-profile-stats d-flex justify-content-center">
                  <img src="/R.png" alt="img" />
              </div>
            </div>
            <div className="text-center">
              <h3>Niranjan Gaonkar</h3>
              <h4><EmailIcon className='email'/>&nbsp;:-<span> NiranjanGaonkar@gmail.com</span></h4>
              <h4><SmartphoneIcon />&nbsp;:-<span> 7382994292</span></h4>
              <h4><ManIcon />&nbsp;:-<span> Male</span></h4>
              <h4><PlaceIcon className='location'/>&nbsp;:-<span> Goa</span></h4>
              <h4>Status&nbsp;:-<span> Active</span></h4>
              <h5><CalendarMonthIcon className='cal'/>&nbsp;Date Created&nbsp;:-<span> 05/07/2002</span></h5>
              <h5><CalendarMonthIcon className='cal'/>&nbsp;Date Updated&nbsp;:-<span> 05/07/2002</span></h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Profile