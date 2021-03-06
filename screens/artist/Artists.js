import React, { useState } from 'react'
import { useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
 import { artists } from '../../data/artistsData';




const Artists = ({navigation}) => {

    const [artistList, setArtists] = useState([]);


    useEffect(() => {
            setArtists(artists);
    }, [])


    
  
    return (
        <ScrollView>
            {
                artistList.map((l, i) => (
                    <ListItem key={i} bottomDivider  onPress={() => navigation.navigate('ArtistDetail',{id:l.id})}>
                        <Avatar source={{ uri: l.img }} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name.toLowerCase()}</ListItem.Title>
                            <ListItem.Subtitle>{l.country}</ListItem.Subtitle>

                        </ListItem.Content>

                    </ListItem>
                ))
            }
        </ScrollView>

        // <FlatList
        //     data={artists}
        //     renderItem={({item}) => <Image style={{height:200, width:'100%', resizeMode:'stretch'}} source={{uri:item.img}}></Image>}
        // >

        // </FlatList>

        
    )
}

export default Artists
