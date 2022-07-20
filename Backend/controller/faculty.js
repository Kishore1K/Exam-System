const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exam1',
});


//faculty sign up

exports.facultySignup = (req, res) => {
    const stafid = req.body.stafid;
    const name = req.body.name;
    const mail = req.body.email;
    const password = req.body.password;
    const dept = req.body.dept;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const dob = req.body.dob;


    console.log(stafid, password, name, mail,gender, phone, dob, dept)
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err,
            });
        } else {
            db.query(
                `INSERT INTO staff (staffid, Name, phno,mail,gender, DOB,password ,dept) VALUES (?,?,?,?,?,?,?,?)`,
                 [stafid, name,phone, mail, gender, dob, hash, dept],
                (err, result) => {
                    if (err) {
                        return res.json({
                            error: err,
                        });
                    } else {
                        
                        return res.send(result)
                    }
                }
            );
        }
    });
}

//faculty login
exports.login = (req, res, done) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
    if(email==="" || password===""){
        res.json({
            message: "Please enter email and password"
        })
    }
    db.query(
        `SELECT * FROM staff WHERE mail = ? `,
        [email],
        (err, result) => {
            //result is empty 
            if(result==''){
                console.log(result);
                res.status(404).json({message:"User  doesnt exist"});

            }
            if(result && result.length > 0){
                bcrypt.compare(req.body.password, result[0].password, (err, compareRes) => {
                    if (err) { // error while comparing
                        console.log(err)
                        res.status(502).json({message: "error while checking user password"});
                    } else if (compareRes) { // password match
                        console.log(result)
                        const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                        res.status(200).json({message: "user logged in", "token": token});
                    } else { // password doesnt match
    
                        res.status(401).json({message: "invalid credentials"});
                    };
                });

            }
            
        }
    );  
};

//profile
exports.profile = (req, res) => {
    const mail = req.body.email;
    console.log(mail)
    db.query(`SELECT * FROM staff WHERE mail = ?`, [mail],

        (err, result) => {
            console.log(result)
            if (err) {
                return res
                .json({
                    error: err
                });
            }
            else {
                return res
                .json({
                    result: result
                });
            }
        }
    )
}






//Enter quiz
exports.enterQuiz = (req, res) => {
    const quizid = req.body.quizid;
    const name = req.body.Name;
    const mail = req.body.Mail;
    const status = req.body.status;
    console.log(quizid, name,mail, status)
    db.query(`INSERT INTO QUIZ (quizid, Name,MAIL, status ) VALUES (?,?,?,?)`, [quizid, name,mail, status],
        (err, result) => {
            if (err) {
                console.log(err);

                return res
                .json({
                    error: err
                });
            }
            else {
                console.log(result)
                return res
                .send(result);

            }
        }
    )
}

//enter question
exports.enterQuestion = (req, res) => {
    const question = req.body.question;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const option3 = req.body.option3;
    const option4 = req.body.option4;
    const answer = req.body.answer;
    const quizid = req.body.quizid;
    console.log(question, option1, option2, option3, option4, answer, quizid)
    db.query(`INSERT INTO questions (question, op1, op2, op3, op4, answer, quizid) VALUES (?,?,?,?,?,?,?)`, [question, option1, option2, option3, option4, answer, quizid],
        (err, result) => {
            if (err) {
                return res
                .json({
                    error: err
                });
            }
            else {
                return res.send(result);
            }
        }
    )
}

//view quiz
exports.viewQuiz = (req, res) => {
    mail = req.body.email;
    console.log(mail)
    db.query(`SELECT * FROM quiz where MAIL= ?`, [mail],
        (err, result) => {
            if (err) {
                return res
                .json({
                    error: err
                });
            }
            else {
                console.log(result)
                return res
                // .json({
                //     message: "Values inserted"
                // })
                .send(result);
            }
        }
    )
}

//set quiz status
exports.setQuizStatus = (req, res) => {
    const quizid = req.body.quizid;
    const status = req.body.status;
    console.log(quizid, status) 
    db.query(`UPDATE quiz SET status = ? WHERE quizid = ?`, [status, quizid],

        (err, result) => {
            if (err) {
                return res
                .json({
                    error: err
                });
            }
            else {
                return res
                .json({
                    message: "Values updated"
                })
            }
        }
    )
}


//view question of quiz
exports.viewQuestion = (req, res) => {
    const quizid = req.body.quizid;
    console.log(quizid)
    db.query(`SELECT * FROM questions WHERE quizid = ?`, [quizid],
        (err, result) => {
            if (err) {
                return res
                
            }
            else {
                return res
                .send(result);
                console.log(result)
            }
        }
    )
}


//update profile
exports.updateProfile = (req, res) => {
    const name = req.body.name;
    const mail = req.body.email;
    const dob = req.body.dob;
    const phone = req.body.phone;
    console.log(mail, name, phone, dob)
    db.query(`UPDATE staff SET Name = ?, phno = ?, DOB = ? WHERE mail = ?`, [name, phone,  dob, mail],

        (err, result) => {
            if (err) {
                return res
                .json({
                    error: err
                });
            }
            else {
                return res
                .send(result);
            }
        }

    )
} 

//get the details of student mail and quiz id
exports.getStudentDetails = (req, res) => {
    const mail = req.body.mail;
    console.log(mail)

    db.query(`SELECT q.quizid, q.Name from quiz q where q.mail = ?`, [mail]
        , (err, result) => {
            // console.log(result)
            if (err) {
                return res
                
            }
            else {
                return res.send(result);
                console.log(result)
            }
        }
    )

    //fetch the students details
    
    
}

//select the students
exports.selectStudent = (req, res) => {
    const mail = req.body.email;
    console.log(mail)
    console.log("Select Students");
    db.query(`SELECT s.STDID,s.Name, s.EMAIL FROM student s, staff st WHERE s.DEPT=st.DEPT and st.mail = ?`, [mail],
        (err, result) => {
            if (err) {
                return res
            }
            else {
                return res
                .send(result);
                console.log(result)
            }
        }
    )
}





//Add students to quiz
exports.addStudents = (req, res) => {
    const mail = req.body.email;
    const quizid = req.body.quizid;
    console.log(quizid, mail)
    db.query(`INSERT INTO exam (quizid, mail) VALUES (?,?)`, [quizid, mail],
        (err, result) => {
            if (err) {
                return res
                
            }
            else {
                return res
                
                .send(result);
            }
        }
    )
}

//get the score of students 
exports.getScore = (req, res) => {
    const quizid = req.body.quizid;
    console.log(quizid)
    db.query(`SELECT s.*, st.NAME FROM score s, student st where s.mail = st.EMAIL and s.quizid = ? `, [quizid],
        (err, result) => {
            console.log(result)
            if (err) {
                return res
                
            }
            else {
                return res
                .send(result);
                
            }
        }
    )
}


//forgot password
exports.forgotPassword = (req, res) => {
    const mail = req.body.email;
    const dob = req.body.dob;
    const password = req.body.password;
    console.log(mail, dob, password)
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res
            .json({
                error: err
            });
        }
        else {
            db.query(`UPDATE staff SET password = ? WHERE mail = ? and DOB = ?`, [hash, mail, dob],


                (err, result) => {
                    if (err) {
                        return res
                        .json({
                            error: err
                        });

                    }
                    else {
                        return res
                        .send(result);
                    }
                }
            )
        }
    })
}
