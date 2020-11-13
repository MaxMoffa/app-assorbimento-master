import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Switch, Image } from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#F4F6FA',
      elevation: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Invite Friends</Text>
        </TouchableHighlight>
        <View style={styles.rowContainer}>
          <Text style={styles.settingText}>{this.props.settings[0].title}</Text>
          <Switch
            onValueChange={() => this.props.update(0)}
            value={this.props.settings[0].switch}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.settingText}>{this.props.settings[1].title}</Text>
          <Switch
            onValueChange={() => this.props.update(1)}
            value={this.props.settings[1].switch}
          />
        </View>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Give Feedback</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Help and Support</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Connect Device</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>About Us</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingContainer} underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: id => dispatch({ type: 'UPDATE_SETTINGS', id })
  };
}

function mapStateToProps(state) {
  return {
    settings: state.setting.settings
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
