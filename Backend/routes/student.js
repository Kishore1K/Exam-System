
const express = require('express');
router = express.Router();
user = require('../controller/student');


router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/profile', user.profile);
router.post('/Exam', user.viewExams);
router.post('/viewQuiz', user.viewQuestions);
router.post('/result', user.examResults);
router.post('/insertMarks', user.insertMarks);
router.post('/update', user.updateDetails);
router.post('/forgot', user.forgotPassword)
//exporting


module.exports = router;
