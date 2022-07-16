import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {View, StyleSheet,Text,TextInput,SectionList,Picker, Button} from 'react-native'
const API_URL = Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '../auth/StorageHelper';
const AddStudent = () => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

    const [open , setOpen] = useState(false);
    const [open1 , setOpen1] = useState(false);

    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);

    const [items , setItems] = useState([
        {label: '', value: ''},
    ]);
    const [items1, setItems1] = useState([
        {label: '', value: ''},
    ]);
    const [state, setState] = useState({
        email: '',
        quizid: '',
    })
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        storage.load({key: 'Fuser'})
        .then(ret1 => {
            setValue(ret1);
            console.log(ret1)
            axios.post(`${API_URL}/faculty/getStudents`,{
                mail : ret1

            })
            .then(res=>{
                console.log(res.data)
                res.data.map(item11 => {
                    setItems1(prev1 => [...prev1,{label:item11.Name, value: item11.quizid} ])
                })
            }
            )
            // console.log(items1)
            storage.load({key:'FQuizId'})
            .then(ret2 => {
                console.log(ret1+1)

                axios.post(`${API_URL}/faculty/getStudent`,{
        
                    email : ret1
                }).then(res2a => {
                    console.log(res2a)
                    res2a.data.map(item => {
                        setItems(prev => [...prev,{label: item.EMAIL, value: item.EMAIL}])
                    })
                })
            })
        })
    }, []);
    

    return (
        // Profile Page Component Details here
        <View>
            <Text style ={styles.txt}> Select The Exam </Text>
            <View style={styles.dropdown}>
            <DropDownPicker
            open= {open1}
            value = {value1}
            items={items1}
            min={0}
            max = {50}
            setOpen={setOpen1}
            setValue={setValue1}
            />

            </View>
            
            <Text style={styles.txt1}>Select Student</Text>
            <View style={styles.dropdown}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                min={0}
                max= {50}
                setOpen={setOpen}
                setValue={setValue}
            />


            </View>
            

            <Button title="Add Student" onPress={() => {
                
            console.log(user)
            console.log(data)
            console.log(value)
                axios.post(`${API_URL}/faculty/addStudent`,{
                    email : value,
                    quizid : value1,
                }).then(res => {
                    console.log(res.data)
                }
                )
            }
            }/>


        </View>
    )

}

const styles = StyleSheet.create({
    txt1 :{
        textAlign : 'center',
        flexDirection : 'column',
        color : 'red',
        marginTop:150,

    },
    dropdown :{
        flexDirection:'column',
        paddingTop:30,
        paddingBottom:50,
        
        height:100,

    }
})

export default AddStudent;