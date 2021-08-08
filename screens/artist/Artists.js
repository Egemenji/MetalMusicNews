import React from 'react'
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { artists } from '../../data/artistsData';


const Artists = ({navigation}) => {

  
    return (
        <>
            {
                artists.map((l, i) => (
                    <ListItem key={i} bottomDivider  onPress={() => navigation.navigate('ArtistDetail',{id:l.id})}>
                        <Avatar source={{ uri: l.img }} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.country}</ListItem.Subtitle>

                        </ListItem.Content>

                    </ListItem>
                ))
            }
        </>
    )
}

export default Artists
