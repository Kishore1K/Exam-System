import React from "react";
import axios from "axios";

import {Table, Row } from 'react-native-table-component';
import {View, Text, StyleSheet,TouchableOpacity, TextInput, Alert} from 'react-native'
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import storage from "../auth/StorageHelper";

const Result = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        storage.load({ key: "FQuizId" })
        .then(ret => {
            // console.log('AddStudent')
            console.log(ret+'1');
            // setData(ret);
            axios.post(`${API_URL}/faculty/getScore`,{
                quizid : ret
            }).then(res => {
                // console.log(user+user+'1')
                console.log(res.data)
                setData(res.data)
            }
            )
            .catch(err => {
                console.warn(err.message);
            }
            );
        })
    }, []);






    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>
                Results
            </Text>
            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
                <Row data={['Name', 'Score', 'QuizID']} style={styles.head} textStyle={styles.text}/>
                {data.map((item, index) => (
                    <Row key={index} data={[item.NAME, item.score, item.quizid]} textStyle={styles.text}/>
                ))}
            </Table>

           
            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#0066ff',
        alignContent: 'center',
        justifyContent: 'center',
    },
    head: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f1f8ff',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#c8e1ff',
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#c8e1ff',
    },
    button: {
        width: 300,
        height: 44,
        backgroundColor: '#9a73ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Result;