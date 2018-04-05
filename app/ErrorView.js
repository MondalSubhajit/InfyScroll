import React, { Component } from 'react'
import {
    AppRegistry,View,Text, TextInput,FlatList,
    TouchableWithoutFeedback,StyleSheet,ActivityIndicator,
    Image,Dimensions,NetInfo 
  } from 'react-native'

export const ErrorView = (props) => {
    return (
      <View>
        <Text>{props.error_msg}</Text>
      </View>
    );
  }
