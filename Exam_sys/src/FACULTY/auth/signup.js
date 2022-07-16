//SignUp page with input name, email, password and confirm password, dept, dob, phone
// Language: javascript 
//using axios to send data to server
import React from 'react';
import axios from 'axios';
import { useState, setData } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
const SignUp = ({ props }) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    // Defaults values for the inputs

    const [state, setData] = useState({
        'stafid': '',
        'name': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
        'dept': '',
        'dob': '',
        'phone': '',
        'gender': '',

    });
    const navigation = useNavigation();
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {
            'stafid': state.stafid,
            'name': state.name,
            'email': state.email,
            'password': state.password,
            'confirmPassword': state.confirmPassword,
            'dept': state.dept,
            'dob': state.dob,
            'phone': state.phone,
            'gender': state.gender
        }
        if(state.password == state.confirmPassword){
        axios.post(`${API_URL}/faculty/signup`, payload)
            .then(res => {
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(res.data.message);
                } else {
                    setIsError(false);
                    setMessage(res.data.message);
                    navigation.navigate('FLogin');
                    
                }
            }).catch(err => {
                setIsError(true);
                setMessage(err.message);
            }
        );
        
    }
    else{
        setIsError(true);
        setMessage("Password and Confirm Password does not match");
    }
    }
    if(state.gender=== 'M'|| state.gender === 'm'){
        state.gender = 'Male';
    }
    else if(state.gender === 'F' || state.gender === 'f'){
        state.gender = 'Female';
    }else if (state.gender === 'o' || state.gender === 'O'){
        state.gender = 'Other';
    }




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Staff Id"
                    onChangeText={(stafid) => setData({ ...state, stafid })}
                    name="stafid"
                    value={state.stafid}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    // onChangeText={onChangeHandler}
                    onChangeText={(name) => setData({ ...state, name })}
                    name="name"
                    value={state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    // onChangeText={onChangeHandler}
                    onChangeText={(email) => setData({ ...state, email })}
                    name="email"
                    value={state.email}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Department"
                    // onChangeText={onChangeHandler}
                    onChangeText={(dept) => setData({ ...state, dept })}
                    name="dept"
                    value={state.dept}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth"
                    // onChangeText={onChangeHandler}
                    onChangeText={(dob) => setData({ ...state, dob })}
                    name="dob"
                    inputMode="date"
                    value={state.dob}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    // onChangeText={onChangeHandler}
                    onChangeText={(phone) => setData({ ...state, phone })}
                    name="phone"
                    value={state.phone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    // onChangeText={onChangeHandler}
                    onChangeText={(gender) => setData({ ...state, gender })}
                    name="gender"
                    value={state.gender}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    // onChangeText={onChangeHandler}
                    onChangeText={(password) => setData({ ...state, password })}
                    name="password"
                    value={state.password}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    // onChangeText={onChangeHandler}
                    onChangeText={(confirmPassword) => setData({ ...state, confirmPassword })}
                    name="confirmPassword"
                    value={state.confirmPassword}
                    secureTextEntry={true}
                />
                
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign Up"
                    onPress={onSubmitHandler}
                    color="#841584"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => {//setIsLogin(true);
                        navigation.navigate('FLogin');
                    
                    }}
                    color="#841584"
                />
            </View>
            
            {isError && <Text style={styles.error}>{message}</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    inputContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },

    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
    },

    buttonContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    error: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    }
});
export default SignUp;
