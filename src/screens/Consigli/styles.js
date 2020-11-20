import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    fontFamily: 'Rubik',
  },
  consigliContainer: {
    padding:10,
    backgroundColor: 'white',
    borderRadius:20,
    width:'100%'
  },
  text: {
    paddingTop:10,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign:'center'
  },
  percorsiContainer: {
    marginHorizontal:12,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 7,
    height:150,
  },
  infoContainer: {
    marginHorizontal:12,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 7,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowContainer2: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  questionIcon: {
    position: "absolute",
    alignSelf: 'center',
    width: 50,
    height: 50,
    top: 8,
    left: 8
  },
  textContainer: {
    height:35,
    justifyContent: 'center',
    margin: (0,0,0,10),
    borderWidth:1,
    borderRadius:5, 
    backgroundColor: 'rgb(158,191,249)',
    borderColor: 'rgb(158,191,249)',
    flex: 1,
    alignSelf: "center",
    padding: 8
  },
  dataConteiner: {
    alignItems: "center"
  },
  mainText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    textAlign:'center'
  },
  secText: {
    fontSize: 12,
    color: '#9c9eb9'
  },
  ProgressBar: {
    flex: 1,
    marginTop: 7,
    flex: 1,
    borderRadius: 40,
  },
  columnContainer: {
    marginTop: 0,
    margin: 10,
    flex: 1,
    alignContent: 'space-between',
    flexDirection: "column"
  }
});

export default styles;
