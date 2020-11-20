import React, {Component} from "react"
import styles from './styles';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from "react-native-gesture-handler";


class ListItem extends Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity
            style={styles.infoContainer}
            activeOpacity={typeof this.props.onClick === "function" ? 0.2 : 1}
            onPress={() => {
                if(typeof this.props.onClick === "function")
                    this.props.onClick();
            }}
          >
            <View style={styles.rowContainer}>
              <Image
                style={styles.questionIcon}
                source={(this.props.iconPath)}
              />
              <View style={styles.columnContainer}>
                <View style={styles.rowContainer2}>
                  <View style={{width: "100%"}}>
                    <View style={[styles.textContainer, {backgroundColor: this.props.titleBackground, borderColor: this.props.titleBackground}]}>
                      <Text style={styles.mainText}>{this.props.title}</Text>
                    </View> 
                    <View style={styles.dataConteiner}>
                      <Text style={styles.secText}>
                        {this.props.goal} / {this.props.goalDone}
                      </Text>
                    </View>
                  </View> 
                </View>
                    <View style={styles.ProgressBar}>
                        <ProgressBar 
                        width={null}
                        progress={this.props.goal/this.props.goalDone}
                        color={this.props.progressBarColor}
                        borderColor= {this.props.progressBarColor}
                        />
                  </View>
              </View>
            </View>
          </TouchableOpacity>

        );
    }

}

export default ListItem;