const express = require("express");
const userController = require("../Controllers/userController");
const authorizationMiddleware=require('../middleware/authorizationMiddleware');
const courseController = require("../Controllers/courseController");
const router = express.Router();

// * Get all users
router.get("/",userController.getAllUsers);



// * Get current user
router.get('/profile ',authorizationMiddleware(['student']), userController.getCurrentUser);

// * Get a user by id
// Place after "/current" so that "current" is not treated as an id
router.get("/:id", authorizationMiddleware(['admin']), userController.getUser);

// * Update a user

router.put("/:id",authorizationMiddleware(['admin','student']),userController.updateUser);

// * Delete a user
router.delete("/:id",authorizationMiddleware(['admin']),userController.deleteUser);


// * Get courses of specific student
router.get("/:studentId/courses",  authorizationMiddleware(['admin','student']),courseController.getStudntCourses);

//* add course
router.put("/:studentId/courses/add/:courseId", authorizationMiddleware(['admin']), courseController.addStudentCourse);

//* remove course
router.put("/:studentId/courses/remove/:courseId",  authorizationMiddleware(['admin']), courseController.dropStudentCourse);

module.exports = router; // ! Don't forget to export the router
