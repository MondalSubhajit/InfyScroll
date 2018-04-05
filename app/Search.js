import React, { Component } from 'react'
import App from './App'
import ListStore from '../app/mobx/listStore'
import Card from './Card';
import {
  AppRegistry,View,Text,StyleSheet,TouchableHighlight ,TextInput,Dimensions,Picker
} from 'react-native'
import { observer } from 'mobx-react'

const window = Dimensions.get('window');

@observer
class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            property: "By Name"
        };
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this._changeText = this._changeText.bind(this);
    }

    _changeText(txt){
        debugger;
        ListStore.filter(txt);
    }

    onBlur(){
        debugger;
        ListStore.toggleList('MAIN'); 
    }
    
    onFocus(){
        debugger;
        ListStore.toggleList('SEARCH');
    }

    render(){
        const {needle,filtered_list} = ListStore;
        return(
            <View style={{padding: 5,width : window.width}}>
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <View style={{flex: 5, backgroundColor: 'rgba(38,38,38,1)', borderRadius: 5}}>    
                        <TextInput
                            // placeholderTextColor= 'rgba(27,98,185,1)'
                            placeholderTextColor= 'rgba(100,100,100,1)'
                            underlineColorAndroid={'transparent'} 
                            placeholder={"Search By name, contact no, location etc."}
                            onChangeText={(text) => this._changeText(text)}
                            onBlur={()=> this.onBlur()}
                            onFocus={()=> this.onFocus()}
                        ></TextInput>
                    </View>
                    {/*<View style={{flex: 1}}>    
                        <Picker  itemStyle={{ backgroundColor: 'red'}}
                            mode="dropdown"
                            selectedValue={this.state.property}
                            onValueChange={(itemValue, itemIndex) => this.setState({property: itemValue})}>
                            <Picker.Item label="..." value="name" />
                            <Picker.Item label="By Name" value="name" />
                            <Picker.Item label="All" value="all" />
                        </Picker>
                    </View>*/}
                </View>
            </View>
          
        );
    }
}


const styles = StyleSheet.create({

  })
  

export default Search;