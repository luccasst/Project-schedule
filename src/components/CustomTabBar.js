import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../context/UserContext';
import { Image, View } from 'react-native';
import HomeIcon from '../assets/inicio.png';
import SearchIcon from '../assets/lupa.png';
import CalendarioIcon from '../assets/calendario.png';
import FavoriteIcon from '../assets/coracao.png';
import ProfileIcon from '../assets/usuario.png';

const TabArea = styled.View`
height: 60px;
background-color: #4EADBE;
flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
flex: 1;
justify-content: center;
align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
width: 70px;
height: 70px;
justify-content: center;
align-items: center;
background-color: #FFF;
border-radius: 35px;
border: 3px solid #4EADBE;
margin-top: -20px;
`;
const AvatarIcon = styled.Image`
width: 24px;
height: 24px;
border-radius: 12px;
`;

export default ({ state, navigation }) => {
    const { state:user } = useContext(UserContext)

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={() =>goTo('Home')}>
                <View>
                 <Image source={HomeIcon} style={{ tintColor: state.index===0 ? '#FFF' : '#0d0f0d', width: 24, height: 24 }} />
                </View>
            </TabItem>
            <TabItem onPress={() =>goTo('Search')}>
                <View>
                 <Image source={SearchIcon} style={{ tintColor: state.index===1 ? '#FFF' : '#0d0f0d', width: 24, height: 24 }} />
                </View>
            </TabItem>
            <TabItemCenter onPress={() =>goTo('Appointments')}>
                <View>
                 <Image source={CalendarioIcon}style={{ tintColor: state.index===2 ? '#457c82' : '#457c82', width: 32, height: 32 }} />
                </View>
            </TabItemCenter>
            <TabItem onPress={() =>goTo('Favorites')}>
                <View>
                 <Image source={FavoriteIcon} style={{ tintColor: state.index===3 ? '#FFF' : '#0d0f0d', width: 24, height: 24 }} />
                </View>
            </TabItem>
        <TabItem onPress={() =>goTo('Profile')}>
                   {/*  {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    : */}
                    <View>
                 <Image source={ProfileIcon} style={{ tintColor: state.index===4 ? '#FFF' : '#0d0f0d', width: 24, height: 24 }} />
                </View>
              {/*   } */}
                
            </TabItem>
        </TabArea>
    )
}