// Read The Questions From Database and Display Them


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CurrentRenderContext } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import storage from '../../FACULTY/auth/StorageHelper';

const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const Quiz = () => {
    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);
    const [email, setEmail] = useState('');
    const [quizid, setQuizid] = useState('');
    const navigation = useNavigation();


    const shuffle = (a) => {
        a.sort(() => Math.random() - 0.5);
    }
    const pickAnswer = (ans) => {
        if(data[number].answer === ans ) {
            setPts(pts + 1);
        }
        setNumber(number + 1);

    }
    
    console.log(pts);
    useEffect(() => {
        storage.load({ key: 'Suser', })
            .then(ret1 => {
                storage.load({ key: 'SQuizId' })
                    .then(ret2 => {
                        console.log(ret1+"abc"+ret2);
                        setEmail(ret1);
                        setQuizid(ret2);
                        axios.post(`${API_URL}/student/viewQuiz`, {
                            quizid: ret2
                        })
                        .then(res => {
                            console.log(res.data.result);
                                console.log(res.data.result);
                                setData(res.data.result.map(item => (

                            {   
                            question: item.question,
                            answer: item.answer,
                            options: [item.op1, item.op2, item.op3, item.op4]
                        })));
                                
                            }
                        )
                    }
                    )
                    .catch(err => {
                        console.warn(err.message);
                    }
                    );
            }
            )
            .catch(err => {
                console.warn(err.message);
            }
            );
    }
        , []);
    console.log(data);
    

                // found data goes to then()


    // const QuizDetails = () => {
    //     axios.post(`${API_URL}/student/viewQuiz`, {
    //         quizid: 
    //     }).then(res => {
    //         setData(res.data.result.map(item => (
    //             {
    //                 question: item.question,
    //                 answer: item.answer,
    //                 options: [item.op1, item.op2, item.op3, item.op4]
    //             }
    //         )));
    //         // console.log(data[0].answer);
    //         // console.log(data[0].options);
    //         alert(data[0].options);
    //     }
    //     )
    // }
   

    // useEffect(() => {
    //     QuizDetails();
    // }
    //     , []);

    // alert(data.NAME)
    return (
        <View style={styles.background}>
        {
            data[number] && 
            <View style={styles.QuizWindow} >
                <Text style={styles.question}>{data[number].question}</Text>
                <View style={styles.button}>
                    {
                        data[number].options.map(item => {
                            return (
                                <View>
                                <Button key={item} title={item} onPress={() => pickAnswer(item)} />
                                <View style={styles.space} />
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        }
        {
            number === data.length && 
             <View style={styles.QuizWindow} >
                <Text style={styles.question}>Your Score: {pts}</Text>
                <Button style = {styles.button} title="Restart Quiz" onPress={() => {
                    setNumber(0);
                    setPts(0);
                }
                }/>
            </View>
            

        }
        {
            number === data.length && 
            <View style={styles.QuizWindow}>
                <Button title="Submit Quiz" onPress={() => {
                    alert("Submit Quiz");
                    axios.post(`${API_URL}/student/insertMarks`, {
                        quizid: quizid,
                        email: email,
                        marks: pts,
                        total : data.length
                    }).then(res => {
                        console.log(res.data.result);
                        alert(res.data.result);
                    }
                    )

                }
                }/>
            </View>

       
        }
        </View>
    )
}

const styles = StyleSheet.create({
    background :{
        height:'100%',
    },
    
    
    QuizWindow: {
        paddingTop : 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:'100%',
    },
    question: {
        fontSize: 40,
        marginBottom: 25,
        textAlign: 'center',
        FontFace :'sans-serif',
        backgroundColor: 'red',
        width: '100%',
        color : 'black',
        borderRadius: 15,
        
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width : '100%',
        marginTop: 20,
        
    },
    space: {
        margin: 10

    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'

    }
    
   

}
);


export default Quiz;
