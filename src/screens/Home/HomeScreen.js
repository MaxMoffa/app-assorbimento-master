import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import MapView from 'react-native-maps';
import styles from './styles';
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
      assInstantaneo: 65.3,
      assMedio: 67.4,
      data : {
        labels: ["1","2","3","4","5","6","7","8","9","10","11","12",
                  "13","14","15","16","17","18","19","20","21","22","23","24"],
        datasets: [
          {
            data: [20,45,28,80,99,43,78,67,45,56,27,100,45,67,89,55,67,38,89,23,45,65,76,58]
          }
        ]
      }
      
    };
  };

  getAssorbimento = async () => {

    let params = new FormData();
    params.append("user", this.props.userName);
    params.append("token", "1fm2adl");
    params.append("timestamp", "");

    fetch("http://188.166.29.27:5001/instant_absorb", {
      method: "POST",
      body: params
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(e => {
      console.error(e);
    })

    // try{
    //   let response= await fetch("http://188.166.29.27:5001/instant_absorb", {
    //     method: "POST",
    //     body: {
    //        user: this.props.userName,
    //        token: "1fm2adl",
    //     }
    //   })
    //   let json= await response.json; 

    //   infoAssorbimento={
    //      assIst:json.Assorbimento_Istantaneo,
    //      assMed:json.Assorbimento_ultime24h,
    //    }
    //   this.setState({assInstantaneo:this.infoAssorbimento.assIst});
    //   this.setState({assMedio:this.infoAssorbimento.assMed});
    // }catch(error){
    //       console.error(error);
    // }
}

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.rowContainer, {marginVertical: 32}]}>
          <View style={styles.headerContainer}>
            <Text style={styles.normalText}>
              Eat the right amount of food and stay hydrated through the day
              {"\n" + this.props.timestamp}
            </Text>
          </View>
          <View style={styles.photoContainer}>
            <View style={styles.greenDot}></View>
             <Image style={styles.userPhoto} source={require('../../../assets/icons/avatar.png')}/>
          </View>
        </View>
        <View style={[styles.assContainer, {backgroundColor:'#039be5'}]}>
          <Text style={styles.text}>Assorbimento istantaneo:</Text>
          <Text style={[styles.text, {color: '#01579b'}]}>{this.state.assInstantaneo}</Text>
        </View>
        <View style={[styles.assContainer, {paddingBottom: 15, backgroundColor:'white'}]}>
          <Text style={[styles.normalText, {textAlign:'center'}]}>Assorbimento sulle 24h</Text>
          <Text style={[styles.normalText, {textAlign:'center'}]}>{this.state.assMedio}</Text>
          <ScrollView horizontal={true} style={{ alignSelf: 'center' }}>
            <BarChart
              data={this.state.data}
              width={SCREEN_WIDTH}
              height={200}
              fromZero
              showValuesOnTopOfBars
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0,
                color: (opacity = 0) => `rgba(0, 145, 225, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 77, 144, ${opacity})`,
                barPercentage : 0.1,
              }}
            />
          </ScrollView>
        </View>
        <View style={{padding:10}}>
          <MapView style={{width:SCREEN_WIDTH-20, height:500}}>
          </MapView>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
   userName: state.registration.userName,
   timestamp: state.timeInfo.timestamp
  };
}

export default connect(
  mapStateToProps,
  null
)(HomeScreen);
