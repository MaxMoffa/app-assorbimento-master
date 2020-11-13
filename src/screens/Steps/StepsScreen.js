import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import ProgressCircle from 'react-native-progress-circle';
import Modal from 'react-native-modal';
import GoalAchievedScreen from '../GoalAchieved/GoalAchievedScreen';
import LineChart from 'react-native-responsive-linechart';
import { lineChartConfig, lineChartData } from '../../data/dataArrays';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export default class StepsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: 'rgb(242,244,249)',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => params.toggleModal()}
        >
          <Image
            style={styles.goalAchievedIcon}
            source={require('../../../assets/icons/goalAchieved.png')}
          />
        </TouchableHighlight>
      )
    };
  };


  componentDidMount() {
    this.props.navigation.setParams({
      toggleModal: this.toggleModal
    });
  }

  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.state ={
      isVisible: false,
      chosenDate: ''
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

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
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Assorbimento
          </Text>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={70}
              radius={80}
              borderWidth={8}
              color="#0091ea"
              shadowColor="#ffff"
              bgColor="#F4F6FA"
            >
              <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <Image
                  style={styles.circleImg}
                  source={require('../../../assets/icons/alert.png')}
                />
                <Text style={styles.circleText}>70 % </Text>
                <Text style={{ fontWeight: '500', textAlign: 'center' }}>Assorbimento giornaliero</Text>
              </View>
            </ProgressCircle>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>1300</Text>
            <Text style={styles.secText}>Assorbimento orario</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>10000</Text>
            <Text style={styles.secText}>Assorbimento giornaliero</Text>
          </View>
        </View>
        <View style={styles.calendarConteiner}>
            <TouchableHighlight style={styles.buttonCalendar} onPress={this.showPicker} >
              <Text style={styles.btnText}>Seleziona una data</Text>
            </TouchableHighlight>
            <Text style={{ color:'#0288d1', fontSize:15,marginTop:5, textAlign:'center'}}>
          {this.state.chosenDate}
        </Text>
            <DateTimePickerModal
              cancelTextIOS= {'Exit'}
              confirmTextIOS= {'OK'}
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode= {'date'}
            />
          </View>
        <View style={styles.statisticContainer}>
          <Text style={styles.statisticTxt}>Statistiche</Text>
          <LineChart
            style={{
              width: SCREEN_WIDTH -10,
              height: 220,
              alignSelf: 'center',
              justifyContent: 'center',
              marginLeft: 20,
              marginRight: 20
            }}
            config={lineChartConfig}
            data={lineChartData}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/polliceSu.png')}
              />
              <View style={styles.perfromanceText}>
                <Text style={{fontSize:18}}>Migliore assorbimento</Text>
                <Text style={styles.secText}>Monday</Text>
              </View>
            </View>
            <Text style={{fontSize:18}}>4</Text>
          </View>
          <View style={styles.performanceContainerBorderless}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../../assets/icons/polliceGiu.png')}
              />
              <View style={styles.perfromanceTextContainer}>
                <Text style={{fontSize:18}}>Peggiore assorbimento  </Text>
                <Text style={styles.secText}>Sunday</Text>
              </View>
            </View>
            <Text style={{fontSize:18}}>10</Text>
          </View>
        </View>
        <Modal isVisible={this.state.modal}>
          <GoalAchievedScreen toggleModal={this.toggleModal} />
        </Modal>
      </ScrollView>
    );
  }
}