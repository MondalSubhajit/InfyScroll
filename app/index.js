import React, { Component } from 'react'
import App from './App'
import ListStore from '../app/mobx/listStore'
import Card from './Card';
import {
  AppRegistry,View,Text, TextInput,FlatList,
  TouchableWithoutFeedback,StyleSheet,ActivityIndicator,
  Image,Dimensions,NetInfo 
} from 'react-native'
import { observer } from 'mobx-react'
import { ErrorView } from './ErrorView'
import Retry from './Retry'
import Search from './Search'

const window = Dimensions.get('window');

@observer
class InfyScroll extends Component {
  componentDidMount(){
    debugger;
    ListStore.getItems();
  }

  refreshData(){
    ListStore.clearList();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: window.width,
          backgroundColor: "#CED0CE",
          marginLeft: window.height/12
        }}
      />
    );
  };

  _ItemLoadMore(){
    debugger;
    if(ListStore.searching == true && ListStore.filtered_list.length >0 ){
      return false;
    }else{
      ListStore.loadMore();
    }
  }

  render () {
    debugger;
    const {list,refreshing,load_more,error,searching,filtered_list,needle} = ListStore;
    // console.log('==========================', list)
    let online =  NetInfo.isConnected;
    let displayItems;
    if(searching == true && needle.length>0){
      displayItems=filtered_list;
    }else{
      displayItems=list;
    }

    if(!online){
      return(
        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
          <Text>Please check your internet connection!</Text>
          <Retry/>
        </View>
      );
    }else{
      return (
        <View style={styles.root}>
          
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',
                        alignItems: 'center',backgroundColor: 'rgba(64,68,72,1)',width: '100%'}}>
          
          {
            (list.length > 0 && error != true) ? (
              <View style={{flex: 1}}>
              <Search />
              {/*  <Text>{JSON.stringify(error)}</Text>
                <Text>{JSON.stringify(searching)}</Text>
                <Text>{JSON.stringify(filtered_list.length)}</Text>
                <Text>{JSON.stringify(displayItems.length)}</Text>
                <Text>{JSON.stringify(needle)}</Text>  */}
              </View>
            ) : (null)
          }
             
            
          { 
            list.length == 0 && error != true ?
            (
              <View style={{justifyContent: 'center',alignItems: 'center', height: window.height}}>
                  <Text style={{fontWeight: 'bold', fontFamily: 'lucida grande',fontSize: 30, color: 'rgba(100,100,100,1)', padding: 20}}>Please wait...</Text>
                <ActivityIndicator animating={true} color="#4CAF50" size="large"/>
              </View>
            ) : (
              <View style={{flex: 8}}>
              {/*<Search />*/}
                {
                  error!==true ? (

                      //when filtered list is empty
                      (searching==true && displayItems.length == 0 && needle.length>0) ? 
                      (
                        <View style={{alignItems: 'center', height: window.height}}>
                            <Text style={{fontWeight: 'bold', fontFamily: 'lucida grande',fontSize: 20, color: 'rgba(147,147,147,1)', padding: 20}}>No results found for "{needle}"</Text>
                          </View>
                      ) : (
                        <View style={{width: window.width}}>
                          {/* list.map((item,index) =><Text key={index}>{JSON.stringify(item)}</Text>) */}
                          <FlatList
                          data={displayItems}
                          ItemSeparatorComponent={this.renderSeparator.bind(this)}
                          renderItem={
                            ({item, index}) => 
                          <Card item={item} index={index}/>
                          }
                          keyExtractor = {(item,index) => index}
                          onRefresh={this.refreshData.bind(this)}
                          refreshing={list.refreshing ? true : false}
                          onEndReachedThreshold={1}
                          onEndReached={this._ItemLoadMore.bind(this)}
                        />
                      </View>
                    )
                    
                  ):(
                    <View>
                      <ErrorView error_msg="Unable to fetch list. Please try again later!" />
                      <Retry />
                    </View>
                  )
                }
              </View>
            )
          }
          </View>
          
          <View style={styles.bottomView}>
            {
              load_more==true ? (
              //  true ? (
                <ActivityIndicator animating={true} color="#0000ff" size="large"/>
              ) :(null)
            }
          </View>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
  list:{
    flex: 6
  },
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader:{
    top: '95%',
    justifyContent: 'space-around',
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  bottomView:{
         width: '100%', 
         height: 50, 
         backgroundColor: 'rgba(0,0,0,0)', 
         justifyContent: 'center', 
         alignItems: 'center',
         position: 'absolute',
         bottom: 0
       },
});

export default InfyScroll;