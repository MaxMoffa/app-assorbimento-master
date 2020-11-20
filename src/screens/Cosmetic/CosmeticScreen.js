import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';


export default class StepsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: 'rgb(242,244,249)',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
    };
  };

  constructor(props) {
    super(props);
  }

  

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>COSMETIC_SCREEN</Text>
      </View>
    );
  }
}