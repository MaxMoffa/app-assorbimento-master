import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:'#039be5',
  },
  mapView: {
    top:0,
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  topButtons: {
    top:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtons: {
    flexDirection: 'column',
    alignItems:'center',
    paddingVertical:10,
  },
  buttonsColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#039be5',
    borderColor: '#039be5',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent:'center'
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  errorText: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.7)',
    margin: 20,
  },
});

export default styles;