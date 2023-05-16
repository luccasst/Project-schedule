import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Image, View } from 'react-native';
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationFinder,
    LocationInput,
    LoadingIcon,
    ListArea
} from './styles';
import BarberItem from '../../components/BarberItem';
import SearchIcon from '../../assets/lupa.png';
import PinIcon from '../../assets/pin.png';
import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);
        let { status } = await Location.requestForegroundPermissionsAsync(
            Permissions.LOCATION_FOREGROUND,
            Permissions.LOCATION_BACKGROUND
        );
        if(Platform.OS === 'android' && (status === 'undetermined' || status === 'grandet')) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
            
            if(status !== 'granted') {
                console.log('Permission denied');
                return;
            }
        } else if (status !== 'granted') {
            console.log('Permission denied');
            return;
        }


        setLoading(true);
        setLocationText('');
        setList([]);

        let location = await Location.getCurrentPositionAsync({});
        setCoords(location.coords);
        getBarbers();
    };

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        if(coords) {
            lat = coords.lat;
            lng = coords.lng;
        }

        let res = await Api.getBarbers(lat, lng, locationText);
        if(res.error == '') {
            if(res.loc) {
                setLocationText(res.loc)
            }
             setList(res.data);
        } else {
            alert("Erro: "+res.error )
        }
        setLoading(false);
    }

    useEffect(() => {
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    return (
        <Container>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() =>navigation.navigate('Search')}>
                        <View>
                            <Image source={SearchIcon} style={{  width: 24, height: 24 }} />
                        </View>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                       <View>
                        <Image source={PinIcon} style={{  width: 24, height: 24 }}/>
                       </View>
                    </LocationFinder>
                </LocationArea>
                { loading &&
                <LoadingIcon size="large" color="#bcc1c2"/>
                }

                <ListArea>
                    {list.map((item, k) =>(
                        <BarberItem key={k} data={item}/>
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}
