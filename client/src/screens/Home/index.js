import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text onPress={()=>}>Home</Text>
      </View>
    );
  }
}
