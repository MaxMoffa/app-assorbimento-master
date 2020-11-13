import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
import ListItem from './listItem';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
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

    this.state = {
      stepsDone: 7000,
      stepsGoal: 10000,
      macroNutrients: {
        proteinDone: 100,
        proteinGoal: 160,
        carbDone: 60,
        carbGoal: 200,
        fatDone: 20,
        fatGoal: 75
      },
      desorbimento: {
        goalDone: 500,
        goal: 1000
      },
      idratazione: {
        goalDone: 2,
        goal: 10
      },
      alimentazione:{
        goalDone: 450,
        goal: 1000
      },
      percorsi:{
        goalDone: 25,
        goal: 100
      }
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      userPhoto: this.props.userPhoto
    });
  }
  onPressNutrition = () => {
    this.props.navigation.navigate('Nutrition', {
      macroNutrients: this.state.macroNutrients
    });
  };

  onPressSteps = () => {
    let stepsDone = this.state.stepsDone;
    let stepsGoal = this.state.stepsGoal;
    this.props.navigation.navigate('Steps', { stepsDone, stepsGoal });
  };

  onPressDetailsText = () => {};

  getCaloriesDone = () => {
    var calories = 0;
    this.props.nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories;
      });
    });
    return calories;
  };
  render() {
    const caloriesDone = this.getCaloriesDone();
    return (
      <ScrollView style={{backgroundColor: "#ECECEC"}}>
        <View elevation={5} style={styles.container}>
          <View style={[styles.rowContainer, {marginVertical: 32}]}>
            <View style={styles.headerContainer}>
              <Text style={styles.boldText}>Good morning, {this.props.userName}</Text>
              <View style={styles.normalTextContainer}>
                <Text style={styles.normalText}>
                  Eat the right amount of food and stay hydrated through the day
                </Text>
              </View>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.onPressDetailsText()}
              >
                <Text style={styles.detailText}>More details</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.photoContainer}>
              <View style={styles.greenDot}></View>
              <Image style={styles.userPhoto} source={require('../../../assets/icons/avatar.png')}   />
            </View>
          </View>
          <View style={[styles.view, {backgroundColor: 'rgb(137,205,195)'}]}>
          	<Text style={styles.text}>Desorbimento</Text>
	          <ListItem iconPath={require('../../../assets/icons/colorWater.png')} titleBackground={"rgb(3,167,124)"} 
	          title={"Idratazione"} goalDone={this.state.idratazione.goal} goal={this.state.idratazione.goalDone} progressBarColor={"rgb(3,167,124)"} 
	          onClick={() => this.props.navigation.navigate('Water')}/>

	          <ListItem iconPath={require('../../../assets/icons/dish.png')} titleBackground={"#2e7d32"} 
	          title={"Alimentazione"} goalDone={this.state.alimentazione.goal} goal={this.state.alimentazione.goalDone} progressBarColor={"#2e7d32"}
	          onClick={() => this.onPressNutrition()} />
          </View>
          <View style={[styles.view, {backgroundColor: 'rgb(253,81,81)'}]}>
          <Text style={styles.text}>Assorbimento</Text>
          <ListItem iconPath={require('../../../assets/icons/manWalk.png')} titleBackground={"rgb(178,0,36)"} 
          title={"Percorsi"} goalDone={this.state.percorsi.goal} goal={this.state.percorsi.goalDone} progressBarColor={"rgb(178,0,6)"} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    waterDone: state.water.waterDone,
    waterGoal: state.water.waterGoal,
    nutritionGoal: state.nutrition.nutritionGoal,
    nutrition: state.nutrition.nutrition,
    userName: state.registration.userName,
    userPhoto: state.registration.userPhoto
  };
}

export default connect(
  mapStateToProps,
  null
)(HomeScreen);
