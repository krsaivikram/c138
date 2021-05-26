import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import axios from "axios"
import {Card,Icon} from "react-native-elements"
export default class Details extends Component {
    constructor(props){
        super(props)
        this.state = {
            details:{},
            imagepath:"",
            url:'http://localhost:5000/planet?name=$(this.props.navigation.getParam("planet_name")'
        }
    }
    Getdetails = ()=>{
      const{url}=this.state
      axios.get(url).then(response=>{
        this.setdetails(response.data.data)
      })
      .catch(error=>{
        Alert.alert(error.message)
      })
    }
    setdetails=planetdetails=>{
      const planettype = planetdetails.planettype
      let imagepath = ""
      switch(planettype){
        case "Gas Giant":
          imagepath = require("../assets/gas_giant.png")
          break;
        case "Terrestrial":
          imagepath = require("../assets/terrestrial.png")
          break;
        case "Super Earth":
          imagepath = require("../assets/super_earth.png")
          break;
        case "Neptune-like":
          imagepath = require("../assets/neptune_like.png")
          break;
        default:
          imagepath = require("../assets/gas_giant.png")   
      }
      this.setState({
        details:planetdetails,imagepath:imagepath
      })
    }
    render(){
      const{details,imagepath} = this.state
      if(details.specifications){
        return(
          <View style = {styles.container}>
            <Card title = {details.name}
            image = {imagepath}
            imageProps = {{resizeMode:"contain",width:"100%"}}>
            <View>
              <Text style = {styles.carditem}>{"distance from earth:$ {details.distance_from_earth}"}</Text>
              <Text style = {styles.carditem}>{"distance from sun:$ {details.distance_from_their_sun}"}</Text>
              <Text style = {styles.carditem}>{"gravity:$ {details.gravity}"}</Text>
              <Text style = {styles.carditem}>{"orbital period:$ {details.orbital_period}"}</Text>
              <Text style = {styles.carditem}>{"orbital speed:$ {details.orbital_speed}"}</Text>
              <Text style = {styles.carditem}>{"planet mass:$ {details.planet_mass}"}</Text>
              <Text style = {styles.carditem}>{"planet radius:$ {details.planet_radius}"}</Text>
              <Text style = {styles.carditem}>{"planet type:$ {details.planet_type}"}</Text>
            </View>
            <View style = {[styles.carditem,{flexDirection:"column"}]}>
            <Text>{details.specifications?'specifications:':""}</Text>
            {details.specigications.map((item,index)=>(
              <Text key = {index.toString()} style = {{marginLeft:50}}>{item}</Text>
            ))}
            </View>
            </Card>
          </View>
        );
      }
  return (
    null
  );
}}
const styles = StyleSheet.create({
  container:{flex:1},
  carditem:{marginBottom:10}
})