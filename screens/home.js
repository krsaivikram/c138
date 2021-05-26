import React from 'react';
import { Alert, StyleSheet, Text, View ,Flatlist,SafeAreaView} from 'react-native';
import axios from "axios";
import {ListItem} from "react-native-elements";
export default class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            listdata:[],
            url:"http://localhost:5000/",
        }
    }
    Getplanets=()=>{
     const{url} = this.state;
     axios.get(url).then(response=>{
         return this.setState({
             listdata:response.data.data
         })
     })
     .catch(error=>{
         Alert.alert(error.message)
         
     })
    }
componentDidMount(){
    this.Getplanets()
}
renderItem = ({item,index})=>(
    <ListItem key={index}
    title = {"planet:${item.name}"}
    subtitle = {"distance from earth:${item.distance_from_earth}"}
    titleStyle = {styles.title}
    conatinerStyle = {styles.listContainer}
    bottomDivider
    chevron 
    onPress={()=>{
        this.props.navigation.navigate("details"),{planet_name:item.name}

    }}
    />
)
keyExtractor = (item,index)=>index.toString()
    render(){
        const{listdata} = this.state
        if (listdata.length===0){
            return(
                <View style = {styles.emptyContainer}>
                    <Text>
                        Loading
                    </Text>
                </View>
            )
        }
  return (
    <View style = {styles.container}>
        <SafeAreaView/>
        <View style = {styles.upperContainer}>
            <Text style = {styles.headerText}>
                PLanets World
            </Text>
        </View>
        <View>

        
     <Flatlist keyExtractor = {this.keyExtractor}
     data = {this.state.listdata}
     renderitem = {this.renderitem}
     />
     </View>
    </View>
  );
}}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#edc988" },
 upperContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" },
  headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" },
   lowerContainer: { flex: 0.9 },
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
     emptyContainerText: { fontSize: 20 }, title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" },
 listContainer: { backgroundColor: "#eeecda" } });