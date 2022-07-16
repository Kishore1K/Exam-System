import React from 'react';
import { StyleSheet, View , Button} from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FRoutes from '../FACULTY/Faculty';
import SRoutes from './Student';

const HomePage = ()=>{
    const navigation = useNavigation();


    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Button title="Faculty" onPress={()=>{
            navigation.navigate('SLogin');
            }
            }/>
            <Button title="Student" onPress={()=>{
            navigation.navigate('SLogin');
            }
            }/>
            
        </View>
    )
}

export default HomePage;