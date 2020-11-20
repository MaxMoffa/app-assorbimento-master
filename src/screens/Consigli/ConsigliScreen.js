import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
import ListItem from './listItem';
import { connect } from 'react-redux';

class ConsigliScreen extends React.Component {
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

    this.state = {
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
      percorsi:{
        goalDone: 25,
        goal: 100
      },
      cosmetica:{
        goalDone: 20,
        goal: 100
      }
    };
  }

  onPressNutrition = () => {
    this.props.navigation.navigate('Nutrition', {
      macroNutrients: this.state.macroNutrients
    });
  };

  onPressWater = () => {
    this.props.navigation.navigate('Water');
  };

  onPressCosmetic = () => {
    this.props.navigation. navigate('Cosmetic');
  }

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
      <ScrollView style={styles.container}>
        <View style={[styles.columnContainer, {marginVertical: 32}]}>
          <View style= {[styles.consigliContainer, {marginTop:50,backgroundColor: 'rgb(126,189,180)'}]}>
            <Text style={[styles.text, {color: 'rgb(41,89,68)'}]}>Consigli</Text>
            <View style={styles.percorsiContainer}>
              <Text> Come assorbire meno</Text>
            </View>

            <ListItem iconPath={require('../../../assets/icons/manWalk.png')} titleBackground={"rgb(1,72,55)"} 
            title={"Percorsi"} goalDone={this.state.percorsi.goal} goal={this.state.percorsi.goalDone} progressBarColor={"rgb(1,72,55)"} />
          
          </View>

        </View>
        <View style={[styles.columnContainer, {marginVertical: 32}]}>
          <View style= {[styles.consigliContainer, {backgroundColor: 'rgb(200,221,209)'}]}>
            <Text style={[styles.text, {color: 'rgb(41,89,68)'}]}>Consigli DetoX</Text>

            <ListItem iconPath={require('../../../assets/icons/colorWater.png')} titleBackground={"rgb(3,167,124)"} 
            title={"Idratazione"} goalDone={this.props.waterGoal} goal={this.props.waterDone} progressBarColor={"rgb(3,167,124)"} 
            onClick={() => this.onPressWater()}/>

            <ListItem iconPath={require('../../../assets/icons/dish.png')} titleBackground={"#2e7d32"} 
            title={"Alimentazione"} goalDone={this.props.nutritionGoal} goal={caloriesDone} progressBarColor={"#2e7d32"}
            onClick={() => this.onPressNutrition()}/>

            <ListItem iconPath={require('../../../assets/icons/cosmetica.png')} titleBackground={"rgb(192,203,153)"} 
            title={"Cosmetica"} goalDone={this.state.cosmetica.goal} goal={this.state.cosmetica.goalDone} progressBarColor={"rgb(192,203,153)"}
            onClick={() => this.onPressCosmetic()}
             />

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
  };
}

export default connect(
  mapStateToProps,
  null
)(ConsigliScreen);