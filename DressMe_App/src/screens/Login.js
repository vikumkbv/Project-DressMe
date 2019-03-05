import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, 
    Animated,
    Keyboard, 
    ImageBackground, 
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    ToastAndroid
  } from 'react-native';

const IMAGE_HEIGHT = window.width / 3.5;
const IMAGE_HEIGHT_SMALL = window.width / 14;

const FIELD_WIDTH = window.width ;

import firebase from '@firebase/app';
import '../Firebase';

export default class Login extends Component {

    state = { 
        email: '', 
        password: '', 
        error: '', 
        loading: false 
      };
    
      onEmailChange = (text) => {
        this.state.email = text;
      }
    
      onPasswordChange = (text) => {
        this.state.password = text;
      }
    
      // when login buttons clicks
      onButtonPress(){
        const email = this.state.email;
        const password = this.state.password;
    
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          });
    }
  constructor(props) {
    super(props);
    const keyboardHeight = new Animated.Value(0);
    const imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        //<Provider store={store}>
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
                            {/* <Animated.Image
                                style={[Styles.yakaLogoImage, { height: this.imageHeight }]}
                                // eslint-disable-next-line global-require
                                source={require('../assets/img/logo-icon/Yaka.png')}
                            /> */}
                            <Text style={Styles.LogoText}> DressMe </Text>
                        </View>


                    </View>

                    <View style={Styles.formContainer}>
                    <View style={Styles.container}>
        <KeyboardAvoidingView style={Styles.container}>
        
          <TextInput
            onChangeText={this.onEmailChange.bind(this)}
            label="email"
            value={this.props.email}
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="user@email.com" 
            placeholderTextColor='black'
            returnKeyType="next"
            style={Styles.textInput1}
          />

          <TextInput 
            onChangeText={this.onPasswordChange.bind(this)}
            label="password"
            value={this.props.password}
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
            LOGIN
          </Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

        <View style={Styles.signUpConatainer}> 
          <Text style={{ paddingRight: 6 }}>
            Don't have an account? | 
          </Text>
          <TouchableOpacity 
            style={Styles.signUpBtn}
            onPress={() => this.props.navigation.navigate('SignUpInitialForm')}
          >
            <Text style={Styles.signUpText}>
              Sign up now
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

    LogoText:{
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
      
  
    },
  
    signUpText: {
      fontWeight: 'bold',
      fontSize: 14,
    },
  
    textInput1: {
      borderRadius: 25,
      height: 45,
      width: FIELD_WIDTH,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      
      color: 'black',
      paddingHorizontal: 15,
      fontSize: 20,
    },
    
  
    textInput2: {
      borderRadius: 25,
      height: 45,
      width: FIELD_WIDTH,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 10,
      color: 'black',
      paddingHorizontal: 15,
      fontSize: 20,
    
    },
  
    btnContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  
  });