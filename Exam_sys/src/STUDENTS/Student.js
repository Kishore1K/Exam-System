// import React from "react";

// // import things related to React Navigation

// // import screens
// import Login from "./auth/login";
// import SignUp from "./auth/signup";
// import Home from "./components/Home";
// import Quiz from "./components/Quiz";
// import Result from "./components/Results";
// import viewExam from "./components/viewExam";
// import Profile from "./components/Profile";


// // create a "stack"

// const MyStack = createNativeStackNavigator();
// const SRoutes = () => {
//   return (
//     <NavigationContainer>
//       <MyStack.Navigator initialRouteName="SignUp">
//         <MyStack.Screen name="SLogin" component={Login} />
//         <MyStack.Screen name="SsignUp" component={SignUp} />
//         {/* After coming To Home Screen No Logout */}
//         <MyStack.Screen name="SHome" component={Home} options={{headerBackVisible:false } } />
//         <MyStack.Screen name="SQuiz" component={Quiz} />
//         <MyStack.Screen name="SResult" component={Result} />
//         <MyStack.Screen name="SViewExam" component={viewExam} />
//         <MyStack.Screen name="SProfile" component={Profile} />
//       </MyStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default SRoutes;