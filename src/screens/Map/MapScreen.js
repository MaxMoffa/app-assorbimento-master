import React from 'react';
import { EventEmitter } from 'fbemitter';
import {  ScrollView,TouchableHighlight,AsyncStorage, Platform, StyleSheet, Text, View, Button,Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import styles from './styles'; 
import { LocationAccuracy } from 'expo-location';

import Modal from 'react-native-modal';
import {BarChart} from 'react-native-chart-kit';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Slider from '@react-native-community/slider';

import { connect } from 'react-redux';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;


const STORAGE_KEY = 'expo-home-locations';
const LOCATION_UPDATES_TASK = 'location-updates';

const locationEventsEmitter = new EventEmitter();


var initial_timestamp=[];

class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Background location',
  };

  mapViewRef = React.createRef();

  state = {
    timeInterval:20,
    minInterval:0.5,
    maxInterval:30,
    accuracy: 4,
    isTracking: false,
    showsBackgroundLocationIndicator: false,
    savedLocations: [],
    initialRegion: null,
    error: null,
    data : {
      labels: ["lun","mar","mer","gio","ven","sab","dom"],
      datasets: [
        {
          data: [20,45,28,80,99,43,78]
        }
     ]
    },
    show:false
  };

  async componentDidMount(){
    this.locating();
  }


  locating = async () => {
    console.log("Hello")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      //AppState.addEventListener('change', this.handleAppStateChange);
      this.setState({
        error:
  'Location permissions are required in order to use this feature. '+
  'You can manually enable them at any time in the "Location Services" section of the Settings app.',
      });
      return;
    } else {
      this.setState({ error: null });
    }

    const { coords } = await Location.getCurrentPositionAsync();
    console.log('coord att')
    console.log('lat:'+coords.latitude)
    console.log('long:'+coords.longitude)
    const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_UPDATES_TASK);
    console.log('istrack:'+isTracking)
    const task = (await TaskManager.getRegisteredTasksAsync()).find(
      ({ taskName }) => taskName === LOCATION_UPDATES_TASK
    );
    const savedLocations = await getSavedLocations();
    const accuracy = (task && task.options.accuracy) || this.state.accuracy;

    this.eventSubscription = locationEventsEmitter.addListener('update', locations => {
      this.setState({ savedLocations: locations });
    });

    if (!isTracking) {
      this.setState({isTracking:true});
    }

    this.setState({
      accuracy,
      isTracking,
      savedLocations,
      initialRegion: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
    });
  };

 

  async startLocationUpdates(accuracy = this.state.accuracy) {
    await Location.startLocationUpdatesAsync(LOCATION_UPDATES_TASK, {
      accuracy:LocationAccuracy.High,
      distanceInterval:5,
      timeInterval: this.state.timeInterval*60000
    });

    if (!this.state.isTracking) {
      alert(
        'Now you can send app to the background, go somewhere and come back here! You can even terminate the app and it will be woken up when the new significant location change comes out.'
      );
    }
    this.setState({ isTracking: true });
  }

  async stopLocationUpdates() {
    await Location.stopLocationUpdatesAsync(LOCATION_UPDATES_TASK);
    this.setState({ isTracking: false });
  }

  clearLocations = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    this.setState({ savedLocations: [] });
  };

  toggleTracking = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);

    if (this.state.isTracking) {
      await this.stopLocationUpdates();
    } else {
      await this.startLocationUpdates();
      var data = new Date();
      var in_timestamp= data.getTime();
      if(!initial_timestamp.includes(in_timestamp)){
        initial_timestamp.push(in_timestamp);
        this.props.updateTimestamp(in_timestamp);
      }
    }
  };

  onAccuracyChange = () => {
    const next = Location.Accuracy[this.state.accuracy + 1];
    const accuracy = next ? Location.Accuracy[next] : Location.Accuracy.Lowest;

    this.setState({ accuracy });

    if (this.state.isTracking) {
      // Restart background task with the new accuracy.
      this.startLocationUpdates(accuracy);
    }
  };

  
  onCenterMap = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const mapView = this.mapViewRef.current;

    if (mapView) {
      mapView.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      });
    }
  };

  renderPolyline() {
    const { savedLocations } = this.state;

    if (savedLocations.length === 0) {
      return null;
    }
    return (
      <MapView.Polyline
        coordinates={savedLocations}
        strokeWidth={5}
        strokeColor={'#039be5'}
      />
    );
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible:false,
      chosenDate: moment(datetime).format('DD MMMM YYYY')
    })
  }

  hidePicker = (datetime) => {
    this.setState({
      isVisible:false
    })
  }

  showPicker =() => {
    this.setState({
      isVisible: true
    })
  }




  render() {
   

    return (
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', paddingBottom: 15, paddingTop:10}}>
            <Text style={styles.headerText}>Percorsi</Text>
            <TouchableHighlight onPress={() => {this.setState({show:true})}}>
              <Image style={styles.iconStyle} source={require('../../../assets/icons/grafics.png')} />
            </TouchableHighlight>
          </View>
          <ScrollView style={{padding:10}}>
            <MapView
              ref={this.mapViewRef}
              style={[styles.mapView,{width:SCREEN_WIDTH-20}]}
              initialRegion={this.state.initialRegion}
              showsUserLocation={true}>
              {this.renderPolyline()}
            </MapView>
            <View style={styles.bottomButtons}>
              <TouchableHighlight style={
                        this.state.isTracking 
                          ? styles.stopButton
                          : styles.button} onPress={this.toggleTracking} title="START - STOP">
                <Text style={styles.textButton}> {this.state.isTracking ? 'Stop tracking' : 'Start tracking'} </Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button} onPress={this.clearLocations} title="clear locations">
                <Text style={styles.textButton}>Clear locations</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.text}>Intervallo di scansione</Text>
                <Slider
                    style={{ width: SCREEN_WIDTH-100}}
                    step={0.5}
                    minimumValue={0.5}
                    maximumValue={30}
                    value={this.state.timeInterval}
                    onValueChange={val => this.setState({ timeInterval: val })}
                    thumbTintColor='rgb(43, 26, 135)'
                    maximumTrackTintColor='#d3d3d3'
                    minimumTrackTintColor='rgb(111, 120, 232)'
                />
                <View style={styles.textCon}>
                    <Text >{this.state.minInterval} min</Text>
                    <Text style={{color: 'rgb(43, 26, 135)'}}>
                        {this.state.timeInterval + ' min'}
                    </Text>
                    <Text >{this.state.maxInterval} min</Text>
                </View>
                <Button title='Press' onPress={() => this.props.navigation.navigate('Home',{value:this.state.timeInterval})}/>
              </View>
          </ScrollView>
        </View>

        

        <Modal
        transparent={true}
        isVisible={this.state.show}
        >
          <View style={{height:'70%'}}>
            <View style={{backgroundColor:'#ffffff', borderRadius:30, padding:20}}>
              <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => {this.setState({show:false})}}
              style={styles.deleteIcon}
            >
              <Image source={require('../../../assets/icons/deleteIcon.png')} />
            </TouchableHighlight>
            <View style={[styles.headerContainer, {padding:20}]}>
              <Text style={styles.normalText}>I migliori percorsi per assorbire meno inquinamento sono:</Text>
            </View>
            <Text style={{ color:'rgb(43, 26, 135)', fontWeight: 'bold',fontSize:15,marginTop:5, textAlign:'center'}}>
            {this.state.chosenDate}
            </Text>
            <View style={{ alignSelf: 'center' }}>
               <BarChart
                data={this.state.data}
                width={SCREEN_WIDTH - 80}
                height={200}
                fromZero
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 0,
                  color: (opacity = 0) => `rgba(43, 26, 135, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(111, 120, 232, ${opacity})`,
                  barPercentage : 0.7,
                }}
                />
            </View>
            <View style={styles.calendarConteiner}>
            <TouchableHighlight style={styles.buttonCalendar} onPress={this.showPicker} >
              <Text style={styles.btnText}>Seleziona una data</Text>
            </TouchableHighlight>
            
            <DateTimePickerModal
              cancelTextIOS= {'Exit'}
              confirmTextIOS= {'OK'}
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode= {'date'}
            />
          </View>
            
            </View>
          </View>
        </Modal> 
      </ScrollView>
    );
  }
}

async function getSavedLocations() {
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
}

 
   TaskManager.defineTask(LOCATION_UPDATES_TASK, async ({ data: { locations } }) => {
  if (locations && locations.length > 0) {
    const savedLocations = await getSavedLocations();
    const newLocations = locations.map(({ coords }) => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));

    savedLocations.push(...newLocations);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));

    locationEventsEmitter.emit('update', savedLocations);
    
    var laturl= newLocations.latitude;
    var longurl= newLocations.longitude;
     
    let latlong=[
      laturl,
      longurl
    ]
     
    var latlongarray=[];
     
    if(!latlongarray.includes(latlong)){
        latlongarray.push(latlong);
        var d = new Date();
        var timestamp= d.getTime();
    }else{
        console.log('coordinate già presenti');
    }
    consol.log('gagsguxgsa');
    try{
      let response= await fetch("http://188.166.29.27:5001/path", {
        method: "POST",
        body: {
          user: this.props.userName,
          token:"1fm2adl",
          initial_timestamp:[],
          current_timestamp:timestamp ,
          coor: latlong
        }
      })
      let json= await response.json;      
    }catch(error){
          console.error(error);
    }
 }
});

function mapStateToProps(state) {
  return {
   userName: state.registration.userName,
   timestamp: state.timeInfo.timestamp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTimestamp: (timestamp) => dispatch({ type: 'UPDATE_TIMESTAMP', timestamp: timestamp}),
  };
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
