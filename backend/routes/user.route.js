import express from 'express'
import multer from 'multer';
import { test, updateUser, deleteUser, uploadProfilePicture, adminGetUsers, adminGetUser, adminUpdateUser, adminDeleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { userValidationRules, validate } from '../utils/validators.js';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Store files in the uploads folder
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Create a unique filename using user id and timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

router.get('/', test);
router.post("/update/:id", verifyToken,userValidationRules(), validate, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

// New route for profile picture upload
// The client must send the file in a field named "profilePicture"
router.post(
    '/upload-profile-picture',
    verifyToken,
    upload.single('profilePicture'),
    uploadProfilePicture
  );

  router.get("/users", adminGetUsers);
router.get("/user/:id", adminGetUser);
router.put("/user/:id", adminUpdateUser);
router.delete("/user/:id", adminDeleteUser);

export default router;