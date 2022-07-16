import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// FACULTY COMPONENTS
import Login from "./FACULTY/auth/login";
import SignUp from "./FACULTY/auth/signup";
import Home from "./FACULTY/components/Home";
import AddQuestion from "./FACULTY/components/AddQuestions";
import AddQuiz from "./FACULTY/components/AddQuiz";
import Profile from "./FACULTY/components/profile";
import Result from "./FACULTY/components/Results";
import Quiz from "./FACULTY/components/Quiz";
import AddStudent from "./FACULTY/components/AddStudent";

//STUDENT COMPONENTS

import SLogin from "./STUDENTS/auth/login";
import SSignUp from "./STUDENTS/auth/signup";
import SHome from "./STUDENTS/components/Home";
import SQuiz from "./STUDENTS/components/Quiz";
import SResult from "./STUDENTS/components/Results";
import SviewExam from "./STUDENTS/components/viewExam";
import SProfile from "./STUDENTS/components/Profile";


const Stack = createNativeStackNavigator();
const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SLogin">
                <Stack.Screen name="FLogin" component={Login} />
                <Stack.Screen name="FSignUp" component={SignUp} />
                <Stack.Screen name="FHome" component={Home}  options={{headerBackVisible:false, headerTitle:null }} />
                <Stack.Screen name="FAddQuestion" component={AddQuestion} />
                <Stack.Screen name="FAddQuiz" component={AddQuiz} />
                <Stack.Screen name="FProfile" component={Profile} />
                <Stack.Screen name="FResult" component={Result} />
                <Stack.Screen name="FQuiz" component={Quiz} />
                <Stack.Screen name="FAddStudents" component={AddStudent} />
                <Stack.Screen name="SLogin" component={SLogin} />
                <Stack.Screen name="SSignUp" component={SSignUp} />
                <Stack.Screen name="SHome" component={SHome} options={{headerBackVisible:false, headerTitle:null }}/>
                <Stack.Screen name="SQuiz" component={SQuiz} />
                <Stack.Screen name="SResult" component={SResult} />
                <Stack.Screen name="SviewExam" component={SviewExam} />
                <Stack.Screen name="SProfile" component={SProfile} />

            </Stack.Navigator>



        </NavigationContainer>
    )
}
export default Routes;
