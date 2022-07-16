// Home Page For Students 

// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import axios  from 'axios';
import { StyleSheet, View, Text,Button, TouchableOpacity, Alert, AsyncStorageStatic } from 'react-native';
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import Menu from '../components/SideMenu';
import storage from '../auth/StorageHelper';
import { TimingAnimation } from 'react-native-reanimated/lib/types/lib/reanimated2/animation';
const Home = ({navigation}) => {
    // Display The User Name
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    

    useEffect(() => {
        storage.load({ key: 'Fuser' })
        .then(ret => {
            // found data goes to then()
            console.log('Home')
            console.log(ret+'1');
            setData(ret);
            axios.post(`${API_URL}/faculty/profile`, {
                email: ret
            })
            .then(res => {
                console.log(res.data.result[0].Name);
                setUser(res.data.result[0].Name);
                // alert(state.mail);
            }
        )
        }
        )
        .catch(err => {
            console.warn(err.message);
        }
        );
    }, []);

    //Page must load after 5 seconds
    
    
    
    return (
        <View style={styles.background}>
            <View style={styles.border}>
                <Text style={styles.text}>Welcome {user}</Text>
                <Menu />
                    

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    border: {
        borderWidth: 2,
        borderColor: '#000',
        width: '100%',
        backgroundColor: '#fff',
        height: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}
);

            
export default Home;
