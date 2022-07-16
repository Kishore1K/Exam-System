import React ,{useState}from "react";
import axios from "axios";
import {View, Text,TextInput,Button, StyleSheet, Icon} from 'react-native';
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import DropDownPicker from "react-native-dropdown-picker";
import storage from '../auth/StorageHelper';
import { useNavigation } from '@react-navigation/native';

const AddQuiz = () => {
    const navigation = useNavigation();

    const [user, setUser] = useState([]);
    const [state, setState] = React.useState({
        quizid: "",
        describe: "",
        status : "",
        Mail: user
    }
    );
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
     
      {label: 'Active', value: '1'},
      {label: 'Inactive', value: '0'}
    ]);
    storage.load({key : 'Fuser'})
    .then(ret => {
        // found data goes to then()
        console.log('AddQuiz')
        console.log(ret+'1');
        setUser(ret);
    }
    )
    .catch(err => {
        console.warn(err.message);
    }
    );

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(state.quizid, state.describe, state.status);

        const payload = {
            quizid:state.quizid,
            Name:state.describe,
            status:value,
            Mail:user
        }
        console.log(payload)
        storage.save({ key: 'FQuizId', data: payload.quizid, expires: null });                    

        //add quizid into database
        axios.post(`${API_URL}/faculty/enterquiz`, payload)
        .then(res => {
            if (res.status === 200) {
                alert('Data Sent');
                navigation.navigate('FAddQuestion')
            } else {
                alert('Data not sent');
            }
        }
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Quiz ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Quiz ID"
                    name="quizid"
                    onChangeText={(quizid) =>setState({...state, quizid})}
                    value={state.quizid}
                />
                <Text style={styles.text}>Quiz Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Quiz Name"
                    name="describe"
                    onChangeText={(describe) =>setState({...state, describe})}
                    value={state.describe}
                />
                <Text style={styles.text}>Status</Text>
                <DropDownPicker 
                     open={open}
                     value={value}
                     items={items}
                     setOpen={setOpen}
                     setValue={setValue}
                     setItems={setItems}

                    // onChangeItem={(item) => setState({...state, status: item.value})}
                />
                
                <View style={styles.button}>
                    <Text
                       style={styles.buttonText} onPress={handleSubmit}
                    > Submit</Text>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: '100%',
        padding: 20,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#0066ff',
        padding: 10,
        marginTop: 10,
        height : 50,
        width: '100%'
    },
    button: {
        backgroundColor: '#0066ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
        width: '100%',
        marginTop: 20
    }
    ,
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

  
export default AddQuiz;