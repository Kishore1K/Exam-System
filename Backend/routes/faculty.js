const express = require('express');
router = express.Router();
user = require('../controller/faculty');


//routes
router.post('/signup', user.facultySignup);
router.post('/login', user.login);
router.post('/profile', user.profile);
router.post('/enterquiz', user.enterQuiz);
router.post('/enterquestion', user.enterQuestion);
router.post('/viewQuiz', user.viewQuiz);
router.post('/updateQuizStatus', user.setQuizStatus);
router.post('/viewQuestion', user.viewQuestion);
router.post('/updateProfile', user.updateProfile);
router.post('/getStudents', user.getStudentDetails);
router.post('/addStudent', user.addStudents);
router.post('/getStudent', user.selectStudent);
router.post('/getScore', user.getScore);
router.post('/forgot', user.forgotPassword)
//exporting
module.exports = router;
