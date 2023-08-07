const express = require('express');
const router = new express.Router();
const upload = require('../multerConfig/storageConfig')

const { userpost, getAllUser } = require('../controllers/usersController')

router.post('/user/register', upload.single('user_profile'), userpost)
router.get('/getUserDetails',getAllUser)


module.exports = router