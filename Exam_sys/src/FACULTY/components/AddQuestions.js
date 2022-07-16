import React, {useEffect, useState} from 'react'

import axios from "axios";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import storage from '../auth/StorageHelper';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddQuestion() {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
     const [value, setValue] = useState(null);
    

    const [quizid, setQuizid] = useState('');
    const [state , setState] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
        quizid:''
    });
    
    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    
    //clear the form
    const clearForm = () => {
        setState({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            quizid:''
        })
    }

    useEffect(() => {
        storage.load({key: 'FQuizId'})
        .then(ret => {
            // console.log('AddStudent')
            // console.log(ret+'1');
            setQuizid(ret);
        }
        )
        .catch(err => {
            console.warn(err.message);
        }
        );
    }
    ,[])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // props.addQuestion(state);
        const payload = {
            question: state.question,
            option1: state.option1,
            option2: state.option2,
            option3: state.option3,
            option4: state.option4,
            answer:value,
            quizid: quizid

        }
        alert(payload.answer)
        axios.post(`${API_URL}/faculty/enterquestion`, payload)
        .then(res => {
            if (res.status !== 200) {
                Alert('Data Not Sent');
            } else {
                alert('Data Sent');
            }
        }
        ).catch(err => {
            Alert(err.message);
        }
        );



    }

    //add new question
    const addnQ = () => {
        clearForm()
    }

    const endQues = () =>{
        alert('once clicked u cant insert question')
        storage.remove({key: 'FQuizId'});
        navigation.navigate('FHome');

        
    }


    return (
        //React Native Elements To Add Questions
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Question</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Question"
                    name="question"
                    onChangeText={(question) => handleChange({target: {name: 'question', value: question}})}
                    value={state.question}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Option 1"
                    name="option1"
                    onChangeText={(option1) => handleChange({target: {name: 'option1', value: option1}})}
                    value={state.option1}
                />
                <TextInput

                    style={styles.input}
                    placeholder="Enter Option 2"
                    name="option2"
                    onChangeText={(option2) => handleChange({target: {name: 'option2', value: option2}})}
                    value={state.option2}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Option 3"
                    name="option3"
                    onChangeText={(option3) => handleChange({target: {name: 'option3', value: option3}})}
                    value={state.option3}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Option 4"
                    name="option4"
                    onChangeText={(option4) => handleChange({target: {name: 'option4', value: option4}})}
                    value={state.option4}
                />
                <DropDownPicker
                    items={[
                        {label: 'Option 1', value:state.option1},
                        {label:'Option 2', value : state.option2},
                        {label: 'Option 3', value : state.option3},
                        {label: 'Option 4', value: state.option4}
                    ]}
                    open={open}
                    value = {value}
                    setOpen={setOpen}
                    setValue={setValue}
                    
                    />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addnQ}
                >
                    <Text style={styles.buttonText}>Add More Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={endQues}
                >
                    <Text style={styles.buttonText}>End Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#0066ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
        marginTop: 20
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
    ,
    form: {
        width: '100%',
        padding: 20,
        marginTop: 20
    }
    ,
    input: {
        borderWidth: 1,
        borderColor: '#0066ff',
        padding: 10,
        marginTop: 10,
        height : 50,
        width: '100%'
    }
    ,
    button: {
        backgroundColor: '#0066ff',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        height: 50,
        width: '100%'
    }
    ,
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
