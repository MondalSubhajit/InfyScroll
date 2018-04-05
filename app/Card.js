import React, { Component } from 'react'
import App from './App';
import {
    AppRegistry,View,Text,
    TextInput,FlatList,TouchableWithoutFeedback,
    StyleSheet,ActivityIndicator,Image,Dimensions, Alert
  } from 'react-native'
import ListStore from '../app/mobx/listStore'
import Swipeout from 'react-native-swipeout'
import UserModal from './UserModal'

  const window = Dimensions.get('window');
  export default class Card extends React.Component {

    constructor(props){
        super(props);
        this.state={
          activeRowKey: null,
          modalVisible: false
        }
        this.onClick = this.onClick.bind(this);
        this.convertTextToWords = this.convertTextToWords.bind(this);
    }
    
    onClick(){
      debugger;
      //set the visibility of modal as true
      this.setState({modalVisible : !this.state.modalVisible});
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

    render(){
      debugger;
      const item = this.props.item;
      const {list,refreshing,load_more,error,searching,filtered_list} = ListStore;

      let displayItems;
      if(filtered_list.length > 0 && searching == true){
        displayItems=filtered_list;
      }else{
        displayItems=list;
      }
        
      const swipeSettings = {
        autoClose:true,
        onClose:(secId, rowId, direction)=>{
          if(this.state.activeRowKey != null){
            this.setState({activeRowKey: null});
          }
        },
        onOpen: (secId, rowId, direction) => {
          debugger;
          this.setState({activeRowKey: this.props.index});
        },
        right:[
          {
            onPress: () =>{
              Alert.alert(
                'Alert',
                'Are you sure you wanna delete ?',
                [
                  {text: 'No', onPress: () => console.log('Cancelled'), style: 'cancel'},
                  {text: 'Yes', onPress:() =>{
                    debugger;
                      displayItems.splice(this.props.index, 1);
                      ListStore.deleteItem(this.props.index);
                  }},
                ],
                {cancelable: true}
              );
            },
            text: 'Delete', type: 'delete'
          }
        ],
        rowId: this.props.index,
        sectionId: 1
      };

        return(
          <Swipeout {...swipeSettings}>
            <UserModal userData={item} visible={this.state.modalVisible} onClick={  () => this.onClick()}/>
            <TouchableWithoutFeedback accessibilityComponentType="button" style={styles.separator}>
              <View style={styles.mainContainer}>
                <View style={styles.tabContainer}>
                  <View style={styles.img}>
                        <Image style={styles.thumbnail}
                            source={{uri:(item.picture.thumbnail)}}
                        /> 
                  </View>
                  <View style={styles.txt}>
                    <View>
                      <Text style={styles.txtContent} numberOfLines={1} ellipsizeMode= 'tail'>{this.convertTextToWords(item.name.title.trim()+". "+item.name.first.trim()+" "+item.name.last.trim())}</Text>
                    </View>
                    <View>
                      <Text style={{color: "rgba(0,121,107,1)", fontSize: 15,}}>{item.email.trim()}...</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.action}>
                  <View style={styles.actionBtn}>
                    <TouchableWithoutFeedback 
                      accessibilityComponentType="button" 
                      onPress={()=>this.onClick()}>
                    <View>
                      <Text style={styles.actionBtnContent} >{">"}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            </Swipeout>
        )
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
      color: 'rgba(64,68,72,1)',
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