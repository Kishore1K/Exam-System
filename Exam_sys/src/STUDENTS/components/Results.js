import React from "react";
import axios from "axios";
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import storage from "../../FACULTY/auth/StorageHelper";
import { View, StyleSheet, Text , ScrollView} from "react-native";
const Result = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        storage.load({ key: "Suser" })
        .then(ret => {
                // found data goes to then()
        console.log("Result");
        console.log(ret + "1");
        axios.post(`${API_URL}/student/result`, {
            email: ret
        }).then(res => {
            console.log(res.data.result);
            // alert(res.data.result[0].Name);
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
                        <View style={styles.border} key={item.ID}>
                            <Text style={styles.text}>Exam ID: {item.quizid}</Text>
                            <Text style={styles.text}>Exam Name: {item.name}</Text>
                            <Text style={styles.text}>Exam Score: {item.score}</Text>
                            <Text style={styles.text}>Exam Status: {item.total}</Text>
                            <Text style={styles.text}>Exam Remarks: {item.remarks}</Text>
                        </View>
                    )

                })
            }
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
    border1: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    text : {
        fontSize: 20,
    }
}
);

export default Result;