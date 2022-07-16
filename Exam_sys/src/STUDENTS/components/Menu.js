//Simple Side Menu with Buttons for Home Profile Result and Exam 
// Language: javascript
import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SimpleSideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Home');
    const navigation = useNavigation();
    const onPressHandler = (name) => {
        setSelected(name);
        setIsOpen(false);
    }
    const onOpenHandler = () => {
        setIsOpen(true);
    }
    const onCloseHandler = () => {
        setIsOpen(false);
    }
    const onBackHandler = () => {
        setIsOpen(false);
    }
    const onLogoutHandler = () => {
        Alert.alert('You have clicked on the Logout button');
        navigation.navigate('Login');
    }
    const onProfileHandler = () => {
        Alert.alert('You have clicked on the Profile button');
        navigation.navigate('Profile');
    }
    const onResultHandler = () => {
        Alert.alert('You have clicked on the Result button');
        navigation.navigate('Result');
    }
    const onExamHandler = () => {
        Alert.alert('You have clicked on the Exam button');
        navigation.navigate('Exam');
    }
    const onHomeHandler = () => {
        Alert.alert('You have clicked on the Home button');
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Simple Side Menu</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyText}>
                    <Text style={styles.bodyText}>
                        You can view the exam details and take the exam.
                    </Text>
                </View>
                <View style={styles.bodyText}>
                    <Text style={styles.bodyText}>
                        You can also view the results of the exams you have taken.
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onPressHandler('SHome');
                    }
                    }>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onPressHandler('SProfile');
                    }
                    }>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onPressHandler('SResult');
                    }
                    }>
                        <Text style={styles.buttonText}>Result</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onPressHandler('SQuiz');
                    }
                    }>
                        <Text style={styles.buttonText}>Exam</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onLogoutHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sideMenu}>
                <View style={styles.sideMenuText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onHomeHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sideMenuText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onProfileHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sideMenuText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onResultHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Result</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sideMenuText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onExamHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Exam</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sideMenuText}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onLogoutHandler();
                    }
                    }>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sideMenuButton}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    onOpenHandler();
                }
                }>
                    <Text style={styles.buttonText}>Open</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#0066ff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: '#0066ff',
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#0066ff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0066ff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sideMenu: {
        backgroundColor: '#0066ff',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuText: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuButton: {
        backgroundColor: '#0066ff',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SimpleSideMenu;