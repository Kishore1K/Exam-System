import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MenuDrawer from 'react-native-side-drawer'
import { useNavigation } from '@react-navigation/native';
import storage from '../auth/StorageHelper';

const Drawer = (props) => {
  const navigation = useNavigation();
  const overlay = false
  const position = 'left'

  const Logout = () =>{
    storage.remove({key: 'Fuser'});
    storage.remove({key:'FQuizid'});
    navigation.navigate('FLogin');


  }

  const drawerContent = () => {
    const edges = position == 'right' ? ['bottom', 'top', 'right'] : ['bottom', 'top', 'left']
    const baseStyle = {flex:0.85, borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}

    return(
      <SafeAreaView  style={baseStyle}>
        <View style={{flexDirection: 'column', height:100,  flex :0.85 ,padding: 5, zIndex:1}}>
          <View style={{flexDirection: 'column', justifyContent: "center", flex:0.85, padding: 5}}>
            <Button title="Home" onPress={() => navigation.navigate('FHome')} /> 
            <Button title="Profile" onPress={() => navigation.navigate('FProfile')} />
            <Button title="AddQuiz" onPress={() => navigation.navigate('FAddQuiz')} />
            <Button title="AddStudents" onPress={() => navigation.navigate('FAddStudents')} />
            <Button title="Results" onPress={() => navigation.navigate('FResult')} />
            <Button title='Logout' onPress={()=> Logout()} />

            </View>
            

          
        </View>
      </SafeAreaView>
    )
  }

  return (
    <MenuDrawer
      open={props.open}
      drawerContent={drawerContent()}
      position={position}
      drawerPercentage={40}
      animationTime={250}
      overlay={overlay}
      opacity={0.5}>
    {props.children}
    </MenuDrawer>
  );
}
const Menu =()=> {
  const [openDrawer, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer)
  }

  return (
    <SafeAreaProvider>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Text style={styles.textLink}>MENU</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Drawer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, backgroundColor: 'blue'
  },
  container: {
    flex: 1, flexDirection: 'column', justifyItems: 'center',
    backgroundColor: 'white', padding: 30
  },
  text: {
    paddingTop: 20
  },
  textLink: {
    paddingTop: 20,
    color: 'blue'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button : {fontSize: 20,flexDirection:'column',  fontWeight: 'bold', color: 'white'},
});

export default Menu;