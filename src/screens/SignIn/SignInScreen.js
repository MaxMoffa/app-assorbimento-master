import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image
} from 'react-native';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onPressButton = () => {
    this.props.navigation.navigate('Home');
  };

  onPressAccount = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../assets/icons/email.png')} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.icon} source={require('../../../assets/icons/password.png')} />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
          </View>

          <View style={styles.signContainer}>
            <Text style={styles.txt}>Sign in with</Text>
            <View style={styles.rowContainer}>
              <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => this.onPressAccount()}
                underlayColor="rgba(73,182,77,1,0.9)"
              >
                <Image
                  style={styles.accountIcon}
                  source={require('../../../assets/icons/twitter.png')}
                />
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => this.onPressAccount()}
                underlayColor="rgba(73,182,77,1,0.9)"
              >
                <Image
                  style={styles.accountIcon}
                  source={require('../../../assets/icons/facebook.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => this.onPressAccount()}
                underlayColor="rgba(73,182,77,1,0.9)"
              >
                <Image
                  style={styles.accountIcon}
                  source={require('../../../assets/icons/google.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
          <ContinueButton onPress={() => this.onPressButton()} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
