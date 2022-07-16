import React from "react";

import {View, StyleSheet, Text, Button} from 'react-native'

import { useNavigation } from "@react-navigation/native";


const HomePage = () => {
    const navigation = useNavigation();

    return(
        <View>
            <Text> HOME PAGE</Text>
        </View>
    )
}

export default HomePage;