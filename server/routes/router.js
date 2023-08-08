const express = require('express');
const router = new express.Router();
const upload = require('../multerConfig/storageConfig');

const { userpost, getAllUser, getSingleUser, deleteSingleUser, updateuser, Search } = require('../controllers/usersController');

router.post('/user/register', upload.single('user_profile'), userpost);
router.get('/getUserDetails', getAllUser);
router.get('/userprofile/:id', getSingleUser);
router.delete('/deleteSingleUser/:id', deleteSingleUser);
router.put('/updateuser/:id', upload.single('user_profile'), updateuser);
router.get('/findusers/:search', Search)

module.exports = router