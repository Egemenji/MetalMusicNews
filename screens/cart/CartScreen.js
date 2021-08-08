import React, {useContext} from 'react'
import cartContext from '../../store/cartContext';
import { ListItem, Avatar, Button } from 'react-native-elements'


const CartScreen = () => {

    const {cart,setCart} = useContext(cartContext);


    const empty = () => {
        setCart([]);
    }

    return (
        <>
                {
                cart.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                   
                        <ListItem.Content>
                            <ListItem.Title>Name: {l.name}</ListItem.Title>
                            <ListItem.Subtitle>Count: {l.count}</ListItem.Subtitle>
                            <ListItem.Subtitle>Price: {l.price.toFixed(2)} TL</ListItem.Subtitle>
                            <ListItem.Subtitle>Total Price: {l.totalPrice.toFixed(2)} TL</ListItem.Subtitle>
                          

                        </ListItem.Content>

                    </ListItem>
                ))
            }
            <Button title='Empty Cart' onPress={() => empty()}></Button>
        </>
    )
}

export default CartScreen
