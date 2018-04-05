import React, { Component } from 'react'
import App from './App'
import ListStore from '../app/mobx/listStore'
import Card from './Card';
import {
  AppRegistry,View,Text,StyleSheet,TouchableHighlight 
} from 'react-native'
import { observer } from 'mobx-react'


@observer
class Retry extends Component {
    onPress(){
        debugger;
        ListStore.getItems();
    }

    render(){
        const {list} = ListStore;
        return(
            <View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text> Retry </Text>
                </TouchableHighlight>
            </View>
          
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
  })
  

export default Retry;