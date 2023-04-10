const router = require('express').Router();


const { activateUser, changeAdminRole, getUser, getAllUsers, deleteUser, getAllAirShippingDetails, getAllSeaShippingDetails,
    getSeaShippingDetails, getAirShippingDetails, deleteSeaShippingDetails, deleteAirShippingDetails, addSeaShippingDetails,
    updateAirShippingDetails, updateSeaShippingDetails, addAirShippingDetails,addMultipleSeaShippingDetails,addMultipleAirShippingDetails } = require('../controller/adminController');
const Auth = require('../middleware/Auth');



//activate-user
router.route('/activate-user/:_id').get(Auth.isAuth, Auth.isAdmin, activateUser);
//changeuser role
router.route('/changeuser-role/:_id').get(Auth.isAuth, Auth.isAdmin, changeAdminRole);
//get-user
router.route('/get-user/:_id').get(Auth.isAuth, Auth.isAdmin, getUser);
// //delete user
router.route('/delete-user/:_id').delete(Auth.isAuth, Auth.isAdmin, deleteUser);
//changeuser role
router.route('/getall-users').get(Auth.isAuth, Auth.isAdmin, getAllUsers);

//get sea shipping details
router.route('/getall-seaShippng').get(Auth.isAuth, Auth.isAdmin, getAllSeaShippingDetails);
//get sea shipping details
router.route('/get-seaShippng/:_id').get(Auth.isAuth, Auth.isAdmin, getSeaShippingDetails);
//add sea shipping details
router.route('/add-seaShippng').post(Auth.isAuth, Auth.isAdmin, addSeaShippingDetails);
//add sea shipping details
router.route('/add-multiple-seaShippng').post(Auth.isAuth, Auth.isAdmin, addMultipleSeaShippingDetails);
// //update sea shipping details
router.route('/update-seaShippng/:_id').put(Auth.isAuth, Auth.isAdmin, updateSeaShippingDetails);
// //delete sea shipping details
router.route('/delete-seaShippng/:_id').delete(Auth.isAuth, Auth.isAdmin, deleteSeaShippingDetails);

//get air shipping details
router.route('/getall-airShippng').get(Auth.isAuth, Auth.isAdmin, getAllAirShippingDetails);
// //get single air shipping details
router.route('/get-airShippng/:_id').get(Auth.isAuth, Auth.isAdmin, getAirShippingDetails);
// //update air shipping details
router.route('/update-airShippng/:_id').put(Auth.isAuth, Auth.isAdmin, updateAirShippingDetails);
// //add air shipping details
router.route('/add-airShippng').post(Auth.isAuth, Auth.isAdmin, addAirShippingDetails);
//add sea shipping details
router.route('/add-multiple-airShippng').post(Auth.isAuth, Auth.isAdmin, addMultipleAirShippingDetails);
// //delete air shipping details
router.route('/delete-airShippng/:_id').delete(Auth.isAuth, Auth.isAdmin, deleteAirShippingDetails);



module.exports = router;