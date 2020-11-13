import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

class WaterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      }
    };
  };

  constructor(props) {
    super(props);
  }

  renderGlass = ({ item }) => {
    return (
      <View style={styles.waterContainer}>
        {item < this.props.waterDone ? (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.props.decrementWater()}
          >
            <Image style={styles.glass} source={require('../../../assets/icons/fullGlass.png')} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.props.incrementWater()}
          >
            <View>
              <Image
                style={styles.glass}
                source={require('../../../assets/icons/emptyGlass.png')}
              />
              <Image style={styles.plus} source={require('../../../assets/icons/plus.png')} />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  };

  render() {
    const waterArray = new Array(this.props.waterGoal).fill(null).map((u, i) => i);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You drank <Text style={styles.waterText}>{this.props.waterDone} glasses</Text>{' '}
            today
          </Text>
        </View>
        <View style={styles.photoContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={waterArray}
            renderItem={this.renderGlass}
            extraData={this.state}
            keyExtractor={item => `${item}`}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>250 ml</Text>
            <Text style={styles.secText}>Water Drank</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>{this.props.waterGoal} glasses</Text>
            <Text style={styles.secText}>Daily goal</Text>
          </View>
        </View>
        <View
          style={
            this.props.waterDone <= this.props.waterGoal / 2
              ? styles.redContainer
              : styles.greenContainer
          }
        >
          <Text
            style={
              this.props.waterDone <= this.props.waterGoal / 2 ? styles.redText : styles.greenText
            }
          >
            {this.props.waterDone <= this.props.waterGoal / 2
              ? 'You didn\'t drink enough water for today.'
              : 'You drank enough water for now.'}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/goodFace.png')}
              />
              <View style={styles.perfromanceText}>
                <Text style={styles.mainText}>Best Performance</Text>
                <Text style={styles.secText}>Monday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>10</Text>
          </View>
          <View style={styles.performanceContainerBorderless}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/badFace.png')}
              />
              <View style={styles.perfromanceTextContainer}>
                <Text style={styles.mainText}>Worst Performance</Text>
                <Text style={styles.secText}>Sunday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>6</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    waterDone: state.water.waterDone,
    waterGoal: state.water.waterGoal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementWater: () => dispatch({ type: 'INCREMENT_WATER' }),
    decrementWater: () => dispatch({ type: 'DECREMENT_WATER' })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaterScreen);
