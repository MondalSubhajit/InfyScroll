import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View,Dimensions,StyleSheet,Image} from 'react-native';

const window = Dimensions.get('window');
export default class UserModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.convertTextToWords = this.convertTextToWords.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  convertTextToWords(txt){
    let wordsArr = txt.split(" ");
    for(var pos = 0; pos<wordsArr.length; pos++){
      let letter = wordsArr[pos].charAt(0).toUpperCase().trim();
      wordsArr[pos] = letter + wordsArr[pos].slice(1);
    }
    let respWords = wordsArr.join(' ');
    return respWords;
  }

  render() {
      debugger;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          animationType="fade"
          visible={this.props.visible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View  style={{justifyContent: "center", margin: 10}}>
            <View style={{justifyContent: 'space-between', borderRadius: 20,
                    borderTopWidth: 1,borderColor: 'rgba(47,50,62,0.5)',borderRightWidth: 1,borderColor: 'rgba(47,50,62,0.5)',
                    backgroundColor: 'rgba(97,97,97,1)', height: window.height/1.1}}>
                <View style={{top: '1%'}}>
                  <View style={{alignItems: 'center'}}>
                    <View>
                      <Image
                        style={{height: window.width/3, width: window.width/3, borderRadius: window.width/6}}
                        source={{uri:(this.props.userData.picture.large)}}
                      /> 
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontWeight: 'bold' ,fontSize: window.height/35,fontFamily: 'Cochin', color:"white", fontSize: 20, padding: 10}}>
                        {this.convertTextToWords(this.props.userData.name.title.trim()+". "+this.props.userData.name.first.trim()+" "+this.props.userData.name.last.trim())}
                      </Text>
                      <View style={{padding: 10}}>
                      <Text style={{color:"white", fontSize: 15}}>Email: {this.props.userData.email}</Text>
                      <Text style={{color:"white", fontSize: 15}}>Contact: {this.props.userData.phone}</Text>
                      <Text style={{color:"white", fontSize: 15}}>Cell No.: {this.props.userData.cell}</Text>
                      </View>
                      <View style={{padding: 10,alignItems: 'center'}}>
                      <Text style={{color:"white", fontSize: 15}}>{"Street: "+this.convertTextToWords(this.props.userData.location.street)}</Text>
                      <Text style={{color:"white", fontSize: 15}}>{"City: "+this.convertTextToWords(this.props.userData.location.city)}</Text>
                      <Text style={{color:"white", fontSize: 15}}>{"State: "+this.convertTextToWords(this.props.userData.location.state)}</Text>
                      <Text style={{color:"white", fontSize: 15}}>{"Postcode: "+this.props.userData.location.postcode}</Text>
                      </View>
                    </View>
                  </View>

                </View>

                <View>
                    <View
                        style={{
                            height: 1,
                            backgroundColor: "#CED0CE",
                        }}>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                        this.props.onClick();
                        }}>
                        <View>
                            <View style={{ borderRadius: 5, padding: '4%', alignItems: 'flex-end' }}>
                                <Text style={{color:"rgba(77,208,225,1)", fontSize: 20}}>Okay , Got it!</Text>                  
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: "red"
  },
  tabContainer:{
    flex:5,
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    height: window.height/8
  },
  img:{
    padding: '1%',
    flex: 1
  },
  txt:{
    flex: 5
  },
  txtContent:{
    fontSize: window.height/35,
    fontFamily: 'Cochin',
  },
  action:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF"
  },
  actionBtnContent:{
    fontSize: window.height/15,
    color: 'lightblue'
  },
  actionBtn:{},
  thumbnail:{
    height: window.height/15,
    width: window.height/15,
    borderRadius: window.height/30,
  }
});