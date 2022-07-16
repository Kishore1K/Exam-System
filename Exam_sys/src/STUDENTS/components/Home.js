// Home Page For Students 

import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { StyleSheet, View, Text,Button, TouchableOpacity, Alert } from 'react-native';
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import { useNavigation } from '@react-navigation/native';
import storage from '../../FACULTY/auth/StorageHelper';

const Home = () => {
    // Display The User Name
    const [user, setUser] = useState('');
    const navigation = useNavigation();

    React.useEffect(() => {

        storage.load({ key: 'Suser' })  
        .then(ret => {
            // found data goes to then()
            console.log('Home')
            console.log(ret+'1');
            setUser(ret);
            axios.post(`${API_URL}/student/profile`, {
                email: ret
            })
            .then(res => {
                console.log(res.data.result[0].NAME);
                setUser(res.data.result[0].NAME);

                // alert(state.mail);
            }
        )
        }
        )
        .catch(err => {
            console.warn(err.message);
        }
        );
        
    }
        , []);
        // console.log(user);
        const Menu = () => {
            return (
                // Simple Menu Component
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SHome');
                    }
                    }>
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SProfile');
                    }
                    }>
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {
                        navigation.navigate('SQuiz');

                    }
                    }>
                        <Text style={styles.menuText}>Quiz</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SResult');
                    }
                    }>
                        <Text style={styles.menuText}>Result</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SViewExam');
                    }
                    }>
                        <Text style={styles.menuText}>View Exam</Text>
                    </TouchableOpacity>

                    </View>
            );
        }
        

    return (
        // Display Page With Menu and Body
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Simple Side Menu</Text>
            </View> */}
            <View style={styles.body}>
                <View style={styles.bodyText}>
                    <Text style={styles.bodyText}>
                        
                    </Text>
                </View>
                <View style={styles.bodyText}>
                    <Text style={styles.bodyText}> Welcome {user} </Text>
                </View>
                {/* <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('SQuiz');
                    }
                    }>
                        <Text style={styles.buttonText}>Take Quiz</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('SProfile');
                    }
                    }>
                        <Text style={styles.buttonText}>View Profile</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('SviewExam');
                    }
                    }>
                        <Text style={styles.buttonText}>View Exam Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('SResult');
                    }
                    }>
                        <Text style={styles.buttonText}>View Result</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
    },
    header: {
        backgroundColor: '#0066ff',
        color: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
    ,
    body: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        height: 800,
    }
    ,
    bodyText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    ,
    footer: {
        backgroundColor: '#0066ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    }
    ,
    footerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    ,
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    }
    ,
    menuText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    ,
    button: {
        backgroundColor: '#0066ff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    }
    ,
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});


       
export default Home;



   

        
