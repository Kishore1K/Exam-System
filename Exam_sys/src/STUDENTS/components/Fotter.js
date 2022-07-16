import React from "react";
import { StyleSheet,Text, View } from "react-native";
import { Icon } from "react-native-vector-icons";


const Fotter = () => {

    return (
        <View style={styles.background}>
            <View style={styles.Fotter}>
                <Text style={styles.FotterText}>
                    {/* Should Contain an Icon to Home and Settings and Quiz */}
                    {/* <Icon name="home" size={30} color="white" />
                    <Icon name="settings" size={30} color="white" />
                    <Icon name="quiz" size={30} color="white" /> */}
                </Text>
            </View>
        </View>
    );

}

styles = StyleSheet.create({
    background: {
        backgroundColor: "#00bfff",
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

    },
    Fotter: {
        backgroundColor: "#00bfff",
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
    },
    FotterText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    }
}
);


export default Fotter;