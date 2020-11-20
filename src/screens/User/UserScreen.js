import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView,Button } from 'react-native';
import styles from './styles';


export default class UserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
     headerStyle: {
        backgroundColor: '#ECECEC',
        elevation: 0,
        height: 5,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
    };
  };
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={{flex:1, marginTop:100}}>
        
      </View>
    );
  }
}


