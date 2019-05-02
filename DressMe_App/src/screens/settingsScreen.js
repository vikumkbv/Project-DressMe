// @Gigara
import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import PhotoUpload from 'react-native-photo-upload';
import RNFetchBlob from 'react-native-fetch-blob';
import { Spinner } from './Spinner';

import firebase from '@firebase/app';
import '../Firebase';
import 'firebase/auth';
import 'firebase/database';

export default class SettingsScreen extends Component {
  // get user data from the databse
  componentDidMount() {
    var user = firebase.auth().currentUser;
    let itemsRef = firebase.database().ref('users/' + user.uid);
    
    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      this.setState({ ProPicurl: data.proPicUrl });
      this.setState({ bDay: data.DOB });
    });
    this.setState({ name: user.displayName })
  }

  // change profile picture
  onPhotoChange = (photo) => {
    // upload user image
    this.setState({ loading: true });

    var user = firebase.auth().currentUser;
    let itemsRef = firebase.database().ref('users/' + user.uid);

    const Blob = RNFetchBlob.polyfill.Blob
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    let uploadBlob = null
    const imageRef = firebase.storage().ref('users').child(user.uid + "/proPic.jpg")
    const mime = 'image/jpg'
    Blob.build(photo, { type: `${mime};BASE64` })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // Update link in the database
        itemsRef.update({
          proPicUrl: url
        });
        this.setState({ loading: false })
      })
  }

  //log out user
  logout(){
    firebase.auth().signOut();
  }

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      loading: false,
    };
  }

  render() {
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Settings</Text>
        </View>
        <View style={{ flex: 1 }}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 5 }} />
            <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
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
                    uri: this.state.ProPicurl
                  }}
                />
              </PhotoUpload>
            </View>
            <SettingsList.Item
              title='Name'
              titleInfo={this.state.name}
              hasNavArrow={false}
              onPress={() => Alert.alert('Name Cannot be changed')}
            />
            <SettingsList.Item
              title='Birth Day'
              titleInfo={this.state.bDay}
              hasNavArrow={false}
              onPress={() => Alert.alert('Cannot be changed')}
            />

            <SettingsList.Header headerStyle={{ color: 'white', marginTop: 10 }} />

            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title='Dark Mode' />
            <SettingsList.Item
              hasNavArrow={false}
              title='Logout'
              onPress={() => {this.logout()}} />
            <SettingsList.Item
              hasNavArrow={false}
              title='Delete Account'
              titleStyle={{ color: 'red' }}
              onPress={() => Alert.alert('This will delete your account and data')} />

          </SettingsList>
        </View>
        {/* loding icon */}
        {this.state.loading &&
          <Spinner />
        }
      </View>
    );
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

