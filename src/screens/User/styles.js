import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop:50,
	    margin:20,
	    backgroundColor: 'white',
	    borderRadius:20,
	    width:'90%',
	    padding: 20,
	    paddingBottom:20
	},
	text:{
		margin:5,
	    color: '#2D3142',
	    fontSize: 20,
	    fontWeight: '600',
	    lineHeight: 24,
	    textAlign:'center'
	},
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goalAchievedIcon: {
    width: 30,
    height: 30,
    margin: 20,
    alignSelf: 'center'
  }
});

export default styles;