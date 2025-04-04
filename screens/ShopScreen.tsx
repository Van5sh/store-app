import { useContext } from 'react';
import { View, Text,Image, Button,FlatList,StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CartContext } from '../contexts/ShopContext';
import { GlobalStyles } from '../constants/colors';

export default function ShopScreen() {
  const { products,addItem } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemStyle}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Rs {item.price}</Text>
            <Image 
              source={{uri:item.image}}
              resizeMode='contain'
              style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{addItem(item)}}>
              <Text style={styles.text}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:GlobalStyles.colors.gold,
  },
  image:{
    width:Dimensions.get("window").width*0.4,
    height:Dimensions.get("window").height*0.2,
    marginBottom:10,
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    color:"#000",
    marginBottom:10
  },
  itemStyle:{
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  button:{
    backgroundColor:"#000",
    padding:10,
    width:Dimensions.get("window").width*0.4,
    borderRadius:5,
    alignItems:"center",
    marginTop:10,
    justifyContent:"center",
    marginLeft:Dimensions.get("window").width*0.5,
  },
  text:{
     color:"#ffff"
  }
})