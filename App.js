/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import axios from "axios";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {

 const apiurl ="http://www.omdbapi.com/?apikey=c61246aa"

 
 const [state, setState] = useState({
   s: "Enter a movie...",
   results: [],
   selected: {}
 });
 
 
 const search = () =>{
   
   axios(apiurl + "&s=" + state.s).then(({ data}) =>{
     let results = data.Search
     console.log(results)
     setState(prevstate =>{
       return{...prevstate,results: results}
     })
   })
 }

 return (
    <View style={styles.container}>
      <Text style={styles.textmovie}>Movie World</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText = { text => setState(prevstate =>{
          return{...prevstate, s :text}
        })}
        onSubmitEditing= {search}
        value = {state.s}
      />
      <ScrollView style={styles.results}>
          {state.results?.map(results =>{
            return (
            <View key={results.imdbID} style={styles.results}>
              <Image
                        style={{height: 150, width: '100%'}}
                        source={{uri: results.Poster}}
                      />
              <Text style={styles.year}>Relesed on: {results.Year} & imdbID: {results.imdbID}</Text>
              <Text style={styles.heading}>{results.Title}</Text>

            </View>
            );
          })}
          
        
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    padding:20
  },
  textmovie:{
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'center'
  },
  searchbox:{
    backgroundColor: '#fff',
    fontSize:15,
    fontWeight: "450",
    padding: 20,
    width: "100%",
    borderRadius:8,
    marginTop:20,
    marginBottom:30
  },
  results:{
    flex:1,
    width :"100%",
    marginBottom:30,
  },
  heading:{
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom:20,
    paddingLeft: 20,
    paddingRight:20,
    backgroundColor: '#445565'
  },
  year:{
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    padding:10,
    paddingTop:20,
    paddingLeft: 20,
    backgroundColor: '#445565'
  },
});

export default App;
