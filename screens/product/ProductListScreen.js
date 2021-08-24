import React, { useContext } from 'react'
import { Alert } from 'react-native'
import { ListItem, Avatar, Button } from 'react-native-elements'
import { products } from '../../data/productsData';
import cartContext from '../../store/cartContext';


const ProductListScreen = () => {



    const { cart, setCart } = useContext(cartContext);

    const addCart = (item) => {





        //eğer ürün sepette yoksa ekle  varsa ürün adedini değiştir
        let product = cart.find(q => q.id == item.id);

        if (product != undefined) {
            product.count = product.count + 1;
            product.totalPrice = product.totalPrice + product.price;
            setCart([...cart]);
        }
        else {


            let newProduct = {
                id: item.id,
                name: item.name,
                count: 1,
                totalPrice: item.price,
                price: item.price
            };

            setCart([...cart, newProduct])

        }

        Alert.alert(
            "İşlem",
            "Bu ürün başarıyla sepete eklendi.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );


    }

    return (
        <>

            {
                products.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{ uri: l.img }} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.year}</ListItem.Subtitle>
                            <ListItem.Subtitle>{l.price.toFixed(2)} TL</ListItem.Subtitle>
                            <Button title='add to cart' onPress={() => addCart(l)}></Button>

                        </ListItem.Content>

                    </ListItem>
                ))
            }
        </>

    )
}

export default ProductListScreen
