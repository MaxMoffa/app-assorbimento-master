import React from 'react';
import { Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import styles from './styles';
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = width > height ? width : height;
const SCREEN_WIDTH = width < height ? width : height;

export default class ModalGraficsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 40
    }
  });
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.firstHalf}>
          <View style={styles.headerContainer}>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => this.props.toggleModal()}
              style={styles.deleteIcon}
            >
              <Image source={require('../../../assets/icons/deleteIcon.png')} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
