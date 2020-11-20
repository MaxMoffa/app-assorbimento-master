import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    fontFamily: 'Rubik',
  },
  headerContainer: {
    margin:15,
    marginRight:0,
    backgroundColor: 'white',
    borderRadius:20,
    width:'81%',
    textAlign: 'left',
    paddingLeft: 20
  },
  photoContainer: {
    paddingTop: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'auto'
  },
  greenDot: {
    height: 12,
    width: 12,
    borderRadius: 10,
    position: 'absolute',
    left: 4,
    bottom: 4,
    borderStyle: 'solid',
    borderColor: '#f4f6fa',
    backgroundColor: '#3fc7bc',
    zIndex: 1
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  normalText: {
    margin:5,
    color: '#2D3142',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign:'left'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  assContainer: {
    borderRadius:20,
    width:'100%',
    textAlign: 'center',
    marginBottom:30
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default styles;
