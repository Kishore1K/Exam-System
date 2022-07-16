//Profile Page Component
import React, {useEffect, useState}  from "react";
import axios from "axios";
import {View, StyleSheet,Text} from "react-native";
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import storage from '../auth/StorageHelper';


const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [state, setState] = useState([]);


    useEffect(() => {
        storage.load({ key: 'Fuser' })
        .then(ret => {
            // found data goes to then()
            console.log('Profile')
            console.log(ret+'1');
            setState(ret);
            axios.post(`${API_URL}/faculty/profile`, {
                email: ret
            })
            .then(res => {
                console.log(res.data.result[0].Name)
                setState(res.data.result[0]);
                setLoading(false);
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
    }, []);

    

    return (
        // Profile Page Component Details here
        <View style={styles.background} >
            <View style={styles.border}>
                <Text style={styles.text}>ID: {state.staffid}</Text>
                <Text style={styles.text}>Name: {state.Name}</Text>
                <Text style={styles.text}>Email: {state.mail}</Text>
                <Text style={styles.text}>Phone: {state.phno}</Text>
                <Text style={styles.text}>Gender: {state.gender}</Text>
                <Text style={styles.text}>Dept: {state.dept}</Text>
                <Text style={styles.text}>DOB: {state.DOB}</Text>
            </View>
        </View>
    )
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



