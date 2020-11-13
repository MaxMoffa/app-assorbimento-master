import React from 'react';
import { EventEmitter } from 'fbemitter';
import { TouchableHighlight,AsyncStorage, Platform, StyleSheet, Text, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import styles from './styles'; 
import { LocationAccuracy } from 'expo-location';


const STORAGE_KEY = 'expo-home-locations';
const LOCATION_UPDATES_TASK = 'location-updates';

const locationEventsEmitter = new EventEmitter();

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Background location',
  };

  mapViewRef = React.createRef();

  state = {
    accuracy: 4,
    isTracking: false,
    showsBackgroundLocationIndicator: false,
    savedLocations: [],
    initialRegion: null,
    error: null,
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
      alert('Click `Start tracking` to start getting location updates.');
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
    }
    this.setState({ savedLocations: [] });
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

  render() {
   

    return (
      <View style={styles.screen}>
        <MapView
          ref={this.mapViewRef}
          style={styles.mapView}
          initialRegion={this.state.initialRegion}
          showsUserLocation={true}>
          {this.renderPolyline()}
        </MapView>
        <View style={styles.buttons} pointerEvents="box-none">
          <View style={styles.topButtons}>
            <View style={styles.buttonsColumn}>
            </View>
            
          </View>

          <View style={styles.bottomButtons}>
            <TouchableHighlight style={styles.button} onPress={this.clearLocations} title="clear locations">
              <Text style={styles.text}>Clear locations</Text>
            </TouchableHighlight>
            <TouchableHighlight style={
                        this.state.isTracking 
                          ? styles.stopButton
                          : styles.button} onPress={this.toggleTracking} title="START - STOP">
              <Text style={styles.text}> {this.state.isTracking ? 'STOP TRACKING' : 'START TRACKING'} </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
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
  }
});

