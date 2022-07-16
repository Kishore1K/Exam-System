// Read The Questions From Database and Display Them


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, Button } from 'react-native';

const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const Quiz = () => {
    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);


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


    const QuizDetails = () => {
        axios.post(`${API_URL}/student/viewQuiz`, {
            quizid: '1'
        }).then(res => {
            setData(res.data.result.map(item => (
                {
                    question: item.question,
                    answer: item.answer,
                    options: [item.op1, item.op2, item.op3, item.op4]
                }
            )));
            // console.log(data[0].answer);
            // console.log(data[0].options);
            alert(data[0].options);
        }
        )
    }
   

    useEffect(() => {
        QuizDetails();
    }
        , []);

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
                    axios.post(`${API_URL}/student/submitQuiz`, {
                        quizid: '1',
                        email: 'reddykishore527@gmail.com',
                        marks: pts
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
    
    
    QuizWindow: {
        paddingTop : 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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
