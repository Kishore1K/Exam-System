// Profile Page

import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import storage from '../../FACULTY/auth/StorageHelper';

const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const Profile = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        storage.load({ key: 'Suser' })
        .then(ret => {
            // found data goes to then()
            console.log('Profile')
            console.log(ret+'1');
            setState(ret);
            axios.post(`${API_URL}/student/profile`, {
                email: ret
            })
            .then(res => {
                console.log(res.data.result[0]);
                setState(res.data.result[0]);
                // alert(state.mail);
            }
        )


        }
    )
    .catch(err => {
        console.warn(err.message);

    })
    }, []);
    console.log(state);
    return (
        // Profile Page Component Details here
        <View style={styles.background} >
             <View style={styles.background} >
            <View style={styles.border}>
                <Text style={styles.text}>USN: {state.STDID}</Text>
                <Text style={styles.text}>Name: {state.NAME}</Text>
                <Text style={styles.text}>Email: {state.EMAIL}</Text>
                <Text style={styles.text}>Phone: {state.PHONE}</Text>
                <Text style={styles.text}>Gender: {state.GENDER}</Text>
                <Text style={styles.text}>Dept: {state.DEPT}</Text>
                <Text style={styles.text}>DOB: {state.DOB}</Text>
            </View>
        </View>
        </View>
    );

}

const styles = StyleSheet.create({
    background: {
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        
        height: '100%',
    },

    border: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,

    },
    text : {
        fontSize: 15,
        fontWeight: 'bold',
        margin:10,
        color: '#000',
    }
})


export default Profile;

