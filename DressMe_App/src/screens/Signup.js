import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image,
    ImageBackground,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import firebase from '@firebase/app';
import '../Firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import PhotoUpload from 'react-native-photo-upload';
import RNFetchBlob from 'react-native-fetch-blob'

const IMAGE_HEIGHT = window.width / 3.5;
const FIELD_WIDTH = window.width;

export default class Signup extends Component {
    state = {
        name: '',
        dob: '',
        email: '',
        password: '',
        proPic: '',
        error: '',
        loading: false
    };

    // methods to set values of user inputs
    onNameChange = (text) => {
        this.setState({ name: text });
    }

    onDOBChange = (date) => {
        this.setState({ dob: date });
    }

    onEmailChange = (text) => {
        this.setState({ email: text });
    }

    onPasswordChange = (text) => {
        this.setState({ password: text });
    }

    onPhotoChange = (photo) => {
        this.setState({ proPic: photo });
    }

    // when signup buttons clicks
    onButtonPress() {
        const name = this.state.name;
        const dob = this.state.dob;
        const email = this.state.email;
        const password = this.state.password;
        const proPic = this.state.proPic;

        // create user in the database
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                var user = firebase.auth().currentUser;
                // set user's name
                user.updateProfile({
                    displayName: name

                    // put skin image url and birthday in database
                }).then(function () {

                    // upload user image
                    const Blob = RNFetchBlob.polyfill.Blob
                    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
                    window.Blob = Blob

                    let uploadBlob = null
                    const imageRef = firebase.storage().ref('users').child(user.uid+"/proPic.jpg")
                    const mime = 'image/jpg'
                    Blob.build(proPic, { type: `${mime};BASE64` })
                        .then((blob) => {
                            uploadBlob = blob
                            return imageRef.put(blob, { contentType: mime })
                        })
                        .then(() => {
                            uploadBlob.close()
                            return imageRef.getDownloadURL()
                        })
                        .then((url) => {
                            // Update users data in the database
                            writeUserData(user.uid, dob, url)

                        })
                        .catch((error) => {
                            console.log(error);

                        })

                }).catch(function (error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });

            }).catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });

        function writeUserData(userId, dob, imageUrl) {
            firebase.database().ref('users/' + userId).push({
                DOB: dob,
                skinImageUrl: imageUrl
            });
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground
                // eslint-disable-next-line global-require
                source={require('../assets/img/logo-background/fashion.jpg')}
                style={Styles.BackgroundImage}
            >


                <StatusBar
                    barStyle="light-content"
                    // eslint-disable-next-line react/jsx-boolean-value
                    hidden={false}
                />

                <View style={Styles.container}>


                    <View style={Styles.logoContainer}>

                        <View style={Styles.logoView}>
                        
                            <Text style={Styles.LogoText}> DressMe </Text>
                        </View>


                    </View>

                    <View style={Styles.formContainer}>
                        <View style={Styles.container}>
                            <KeyboardAvoidingView style={Styles.container}>

                                {/* pro pic upload  */}
                                <PhotoUpload
                                    onPhotoSelect={avatar => {
                                        if (avatar) {
                                            this.onPhotoChange(avatar);
                                        }
                                    }}
                                >
                                    <Image
                                        style={{
                                            paddingVertical: 30,
                                            width: 150,
                                            height: 150,
                                            borderRadius: 75
                                        }}
                                        resizeMode='cover'
                                        source={{
                                            uri: 'https://studycrafter.com/wp-content/uploads/2017/12/IAFOR-Blank-Avatar-Image-1-768x768.jpg'
                                        }}
                                    />
                                </PhotoUpload>

                                <TextInput
                                    onChangeText={this.onNameChange.bind(this)}
                                    label="name"
                                    value={this.state.name}
                                    placeholder="Your full name"
                                    placeholderTextColor='black'
                                    returnKeyType="next"
                                    style={Styles.textInput1}
                                />

                                <DatePicker
                                    onDateChange={(date) => { this.onDOBChange(date) }}
                                    placeholder="Birth Day"
                                    style={Styles.DatePicker}
                                    date={this.state.dob}
                                    mode="date"
                                    androidMode="spinner"
                                    minDate="1950-01-01"
                                    maxDate="2005-01-01"
                                    textColor="black"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            fontSize: 18,
                                        },
                                        placeholderText: {
                                            color: 'black',
                                            fontSize: 18,
                                            paddingTop: 8,
                                        },
                                        dateText: {
                                            fontSize: 19,
                                            paddingTop: 8,
                                        }
                                    }}
                                />
                                <TextInput
                                    onChangeText={this.onEmailChange.bind(this)}
                                    label="email"
                                    value={this.state.email}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    placeholder="user@email.com"
                                    placeholderTextColor='black'
                                    returnKeyType="next"
                                    style={Styles.textInput2}
                                />

                                <TextInput
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    label="password"
                                    value={this.state.password}
                                    autoCorrect={false}
                                    placeholder="Password"
                                    placeholderTextColor='black'
                                    secureTextEntry
                                    returnKeyType="done"
                                    style={Styles.textInput2}
                                />

                                <View style={Styles.btnContainer}>
                                    <TouchableOpacity
                                        style={Styles.loginBtn}
                                        onPress={this.onButtonPress.bind(this)}
                                    >
                                        <Text style={Styles.btnText}>
                                            Signup
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>

                            <View style={Styles.signUpConatainer}>
                                <Text style={{ paddingRight: 6, color: 'white' }}>
                                    Already have an account? |
                                </Text>
                                <TouchableOpacity
                                    style={Styles.signUpBtn}
                                    onPress={() => navigate('Login')}
                                >
                                    <Text style={Styles.signUpText}>
                                        Sign in
    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>

                </View>
            </ImageBackground>
        );
    }
}


const Styles = StyleSheet.create({

    container: {
        flex: 1,

    },

    logoContainer: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',


    },

    formContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 20
    },

    logoView: {
        marginTop: 5,
        alignItems: 'center',
        flexGrow: 0.3,
        justifyContent: 'center',
    },

    yakaLogoImage: {
        flex: 1,
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',

    },

    LogoText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 50,
        fontWeight: 'bold',
    },

    BackgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined
    },

    // form
    loginBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 2,
        width: 100,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 25,
        opacity: 0.9,
    },

    btnText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },

    errorText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'center',
    },

    signWithContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    signUpIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 15,
        marginBottom: 7,

    },

    signUpConatainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 1,
        textAlign: 'center'
    },

    signUpBtn: {
        color: 'white'

    },

    signUpText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },

    textInput1: {
        borderRadius: 25,
        height: 45,
        width: FIELD_WIDTH,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',

        color: 'black',
        paddingHorizontal: 15,
        fontSize: 18,
    },


    textInput2: {
        borderRadius: 25,
        height: 45,
        width: FIELD_WIDTH,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 10,
        color: 'black',
        paddingHorizontal: 15,
        fontSize: 18,

    },

    DatePicker: {
        borderRadius: 25,
        height: 45,
        width: FIELD_WIDTH,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 10,
        paddingHorizontal: 15,
    },

    btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});