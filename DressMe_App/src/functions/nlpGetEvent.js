import React, { Component } from 'react';
import { View, Text } from 'react-native';

 export function getEvent(text){
    const dataSource = "";
  
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          "documents": [
            {
              "language": "en",
              "id": "1",
              "text": text.text
            }
          ]
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key':'f22d5583570246c8a42dc169935b2780'
        }
      }
      return fetch('https://centralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',data)
        .then((response) => response.json())
        .then((responseJson) => responseJson.documents);

    }
    
