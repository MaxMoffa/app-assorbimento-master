import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mapView: {
    height: 600
  },
  container: {
    marginTop:50,
    borderRadius:35,
    backgroundColor:'white',
    paddingBottom: 10,
  },
  headerText: {
    color: 'rgb(43, 26, 135)',
    fontSize: 30,
    fontWeight: 'bold',
    left:150,
  },
  headerContainer: {
    marginTop:15,
    marginRight:0,
    backgroundColor: 'white',
    borderRadius:10
  },
  normalText: {
    margin:5,
    color: 'rgb(111, 120, 232)',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign:'center'
  },
  calendarConteiner: {
    justifyContent: 'flex-end',
    height: 60,
    marginTop: 30
  },
  buttonCalendar: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgb(111, 120, 232)',
    borderColor: 'rgb(111, 120, 232)',
    borderRadius: 60,
    alignSelf: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  sliderContainer: {
    marginTop:10,
      margin:20,
      backgroundColor: 'white',
      borderRadius:20,
      width:'90%',
      padding: 20,
      paddingBottom:20
    },
  text:{
      color: 'rgb(111, 120, 232)',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 24,
      textAlign:'center'
  },
  textCon: {
      width: SCREEN_WIDTH-100,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  deleteIcon: {
    position: 'absolute', 
    right: 10, 
    top:10, 
    zIndex: 10
  },
  datiContainer: { 
    marginTop:20, 
    paddingLeft:50,
    borderRadius:35,
  },
  datiText:{
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign:'left'
  },
  iconStyle: {
    position: 'absolute', 
    left: 240,
    zIndex: 10,
    width:50,
    height:50,
  },
  button: {
    marginTop:20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 35,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(111, 120, 232)',
    borderColor: 'rgb(111, 120, 232)',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent:'center'
  },
  stopButton: {
    marginTop:20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 35,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(43, 26, 135)',
    borderColor: 'rgb(43, 26, 135)',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent:'center'
  },
  bottomButtons: {
    flexDirection: 'column',
    alignItems:'center',
    paddingVertical:10,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default styles;