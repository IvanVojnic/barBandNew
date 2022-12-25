import React, {useEffect, useState} from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Image } from 'react-native';
import {onLoggedIn} from '../core/api/API'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from "../env.js";
import {getId, getAccessToken} from "../core/api/API";

const API_URL = Platform.OS === 'ios' ? `http://192.168.1.29:${PORT}` : `http://192.168.1.29:${PORT}`;

const storeAccessToken = async (value) => {
    try {
        await AsyncStorage.setItem('accessToken', String(value))
    } catch (e) {
        console.log(e)
    }
}

const storeId = async (value) => {
    try {
        await AsyncStorage.setItem('userId', value)
    } catch (e) {
        console.log(e)
    }
}

const removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        console.log("except" + exception)
        return false;
    }
}

const AuthScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    useEffect( () => {

        const loadData = async (token) => {
          //  const token = "o"//await getAccessToken();
            console.log(token)
            console.log("___1___")
            let responseAuth = await onLoggedIn(token)//.then(async responseAuth => {
            console.log(responseAuth)
            console.log("___2___")
            if (responseAuth){
                console.log("___3___")
                setIsError(false);
                setMessage("hi");
                console.log("___4___")
                if(isLogin){
                    console.log("___5___")
                    navigation.navigate('MainScreen');
                }

            } else {
                console.log("error in token")
                await removeItemValue('accessToken')
                setMessage("not hi");
                setIsError(true);
            }
        }
        const getToken = async () => {
            const token = await getAccessToken();
            console.log("Token up line")
            console.log(token)
            if (token != null && token != undefined && token != "") {
                await loadData(token)
            }
        }
        getToken()
    },[])

    const onSubmitHandler = async () => {
        const payload = {
            email,
            name,
            password,
        };
        const res = await fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        try {
            console.log("login result")
            const jsonRes = await res.json();
            console.log(jsonRes)
            if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
            } else {
                /*const responseAuth =*/onLoggedIn(jsonRes.token).then(async (respAuth) => {
                    console.log("responseAuth")
                    console.log(respAuth)
                    respAuth = await respAuth.json()
                    console.log("responseAuth2")
                    console.log(respAuth)
                    if (respAuth.checkAuth) {
                        console.log("req1")
                        setIsError(false);
                        await storeId(String(jsonRes.id))
                        console.log(jsonRes.id)
                        await storeAccessToken(jsonRes.token)
                        setMessage(respAuth.message);
                        console.log(message)
                        if(isLogin){
                            navigation.navigate('MainScreen');
                        }
                    } else {
                        console.log("any error")
                        setMessage(jsonRes.message);
                        setIsError(true);
                    }
                }).catch((er) => {
                    console.log("er")
                    console.log(er)
                })
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default AuthScreen;
