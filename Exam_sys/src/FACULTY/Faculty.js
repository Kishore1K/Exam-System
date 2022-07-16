// import React from "react";

// // import things related to React Navigation
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // import screens
// import Login from "./auth/login";
// import SignUp from "./auth/signup";
// import Home from "./components/Home";
// import AddQuestion from "./components/AddQuestions";
// import AddQuiz from "./components/AddQuiz";
// import Profile from "./components/profile";
// import Result from "./components/Results";
// import Quiz from "./components/Quiz";
// import AddStudent from "./components/AddStudent";

// // create a "stack"
// const MyStack = createNativeStackNavigator();

// const FRoutes = () => {
//   return (
//     <NavigationContainer>
//       <MyStack.Navigator initialRouteName="SignUp">
//         <MyStack.Screen name="FLogin" component={Login} />
//         <MyStack.Screen name="FsignUp" component={SignUp} />
//         {/* After coming To Home Screen No Logout */}
//         <MyStack.Screen name="FHome" component={Home}  } />
//         <MyStack.Screen name="FAddQuestion" component={AddQuestion} />
//         <MyStack.Screen name="FAddQuiz" component={AddQuiz} />
//         <MyStack.Screen name="FProfile" component={Profile} />
//         <MyStack.Screen name="FResult" component={Result} />
//         <MyStack.Screen name="FQuiz" component={Quiz} />
//         <MyStack.Screen name="FAddStudents" component={AddStudent} />

//       </MyStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default FRoutes;