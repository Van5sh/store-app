import { useContext } from 'react';
import { View, Text,TouchableOpacity, Button,Image,Dimensions,StyleSheet } from 'react-native';
import { CartContext } from '../contexts/ShopContext';
import { GlobalStyles } from '../constants/colors';
export default function CartScreen() {
  // const { cartItems, deleteItem } = useContext(CartContext);
  const {cartItems,deleteItem}=useContext(CartContext);

  return (
    <View style={{flex:1,backgroundColor:"#ffff32"}}>
      <Text>Cart Items</Text>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View style={styles.itemStyle}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Rs {item.price}</Text>
            <Image 
              source={{uri:item.image}}
              resizeMode='contain'
              style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{deleteItem(item.id)}}>
              <Text style={styles.text}>DELETE</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No items in cart</Text>
      )}
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