import React, { useState, useEffect } from "react";
import axios from "axios";
import {View, StyleSheet, Text, Button, Alert, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import storage from "../../FACULTY/auth/StorageHelper";
const ViewExam = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    
    useEffect(() => {
        storage.load({ key: 'Suser' })
        .then(ret => {

        axios.post(`${API_URL}/student/Exam`, {
        email: ret
        }).then(res => {
        console.log(res.data.result);
        setData(res.data.result);
        })
        }
        )
        .catch(err => {
        console.warn(err.message);
        }
        );
    }, []);
    // alert(data.NAME)
    
    return (
        <ScrollView>
        <View style={styles.background} >
            <View style={styles.border}>{
                data.map(item => {
                    return (
                        <View key={item.id}>
                            <Text style={styles.text}>Exam Name: {item.name}</Text>
                            <Text style={styles.text}>Exam Status: {item.STATUS}</Text>
                            <Text style={styles.text}>Exam ID: {item.quizid}</Text>
                            <Button title="Attend Quiz" onPress={() => {
                                storage.save({ key: "SQuizId", data: item.quizid });
                                alert('Attend Exam');
                                navigation.navigate("SQuiz");
                            }
                            }/>
                        </View>
                    )
            
            })}
            </View>
                
        </View>
        </ScrollView>
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
        fontSize: 20,
    }
});

export default ViewExam;