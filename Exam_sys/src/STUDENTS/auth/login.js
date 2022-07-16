import React ,{useState}from 'react';
import axios from 'axios';
import { StyleSheet, View, Text,TextInput,  TouchableOpacity } from 'react-native';
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import { useNavigation } from '@react-navigation/native';
import storage from '../../FACULTY/auth/StorageHelper';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigation = useNavigation();


    const onChangeHandler = (e) => {
        setIsError(false);
        setMessage('');
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {
            'email': email,
            'password': password
        }
        if(isLogin){
            axios.post(`${API_URL}/student/login`, payload)
            .then(res => {
                if (res.status !== 200) {
                    alert('Data Not Sent');
                    setIsError(true);
                    setMessage(res.data.message);
                } else {
                    storage.save({ key: 'Suser', data: email, expires: null });     
                    setIsError(false);
                    setMessage(res.data.message);
                    alert('Loged IN')
                   
                    navigation.navigate('SHome');
                    // AsyncStorageStatic.setItem('token', res.data.token);
                    // AsyncStorageStatic.setItem('user', JSON.stringify(res.data.user));

                }
            }).catch(err => {
                setIsError(true);
                setMessage(err.message);
            }
        );
        }
    }
    
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonAlt} onPress={()=> navigation.navigate('FLogin')}>
                <Text style={styles.buttonText}>FACULTY </Text>
            </TouchableOpacity>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
            <Text style={styles.error}>{message}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
                name="email"
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                name="password"
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt} onPress={()=> navigation.navigate('SSignUp')}>
                <Text style={styles.buttonText}>{isLogin ? 'Signup' : 'Login'}</Text>
            </TouchableOpacity>
            {isError && <Text style={styles.error}>{message}</Text>}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        height: '100%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#9a73ef',
        marginBottom: 10,
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
    },
    buttonAlt: {
        width: 300,
        height: 44,
        backgroundColor: '#9a73ef',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }
});


export default Login;

