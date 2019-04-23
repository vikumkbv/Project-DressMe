// //Jonathan Gurusinghe
// //Chat Bot
// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import {Platform, StyleSheet, Text, View, 
//     Animated,
//     Keyboard, 
//     ImageBackground, 
//     StatusBar,
//     KeyboardAvoidingView,
//     TouchableOpacity,
//     TextInput,
//     ToastAndroid,
//     AlertIOS
//   } from 'react-native';
//   import { GiftedChat } from 'react-native-gifted-chat'

// export default class chatBot extends Component {
//     constructor(props){
//     super(props);

//     //display the first message to the user
//     let initialMsg = {
//         _id: 1,
//         text: 'Hello DressMe User!, Let Me Know What you are upto',
//         createTime: new Date(),
//         user: {
//             _id: 2,
//             name: 'jonathan'
//         },
//         alert: AlertIOS.alert('Hey Welcome to Customer assistance'
//         [{text: 'OK', onPress: ()=>console.log('cancel pressed')}], {cancelable:false},
//         )
        
//     }

//     this.state = {
//         messages: [initialMsg]
// }
//     }

//     //#.gitignore 
//     componentDidMount() {
//         Dialogflow_V2.setConfiguration(config.config);

//     }
//     onSend(messages = []) {
//         this.state(previousState => ({
//             messages: GiftedChat.append(previousState.messages, messages),
//         }));

//         let text = messages[0].text;
//         Dialogflow_V2.requestQuery(
//         text,
//          result => this.handleResponse(result),
//         error => console.log(error)
//     );
// }

// //handle responses from the server fetched from the google cloud 
// handleResponse(result) {
//     let text = result.queryResult.fulfillmentMessages[0].text.text[0];
//     this.sendBotResponse(text);
//   }

//   render() {
//     return (
//         <ScrollView style={styles.container}>
//             <GiftedChat
//                 messages={this.state.messages}
//                 onSend={messages => this.onSend(messages)}
//                 user={{
//                     _id: 1
//                 }}
//             />
//         </ScrollView>
//     )
//   }
// }
