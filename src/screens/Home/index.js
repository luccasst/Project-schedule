import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
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
    const [token, setToken] = useState(null);

    const handleLocationFinder = async () => {
        setCoords(null);
        let { status } = await Location.requestForegroundPermissionsAsync(
            Permissions.LOCATION_FOREGROUND,
            Permissions.LOCATION_BACKGROUND
        );
        if (Platform.OS === 'android' && (status === 'undetermined' || status === 'grandet')) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);

            if (status !== 'granted') {
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

    const getBarber = async () => {
        setLoading(true);
        setList([]);
      
        let lat = null;
        let address = null
        let lng = null;
        if (coords) {
          address = coords.address;
          lat = coords.lat;
          lng = coords.lng;
        }
      
        try {
            const token = await AsyncStorage.getItem('token');
          const response = await fetch(`http://192.168.0.39:3010/barber?lat=${lat}&lng=${lng}&&address=${address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            // Se necessário, adicione parâmetros à URL
            // Exemplo: `http://192.168.0.39:3010/barber?lat=${lat}&lng=${lng}`
          });
      
          if (response.ok) {
            const data = await response.json();
            setList(data);
          } else {
            console.error('Erro ao buscar barbeiros:', response.status);
            // Lógica para tratar o erro, se necessário
          }
        } catch (error) {
          console.error('Erro ao buscar barbeiros:', error);
          // Lógica para tratar o erro, se necessário
        }
      
        setLoading(false);
      };
      

    useEffect(() => {


        getBarber();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarber();
    };

    const handleLocationSearch = () => {
        setCoords({});
        getBarber();
    };

    return (
        <Container>
            <Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <View>
                            <Image source={SearchIcon} style={{ width: 24, height: 24 }} />
                        </View>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <View>
                            <Image source={PinIcon} style={{ width: 24, height: 24 }} />
                        </View>
                    </LocationFinder>
                </LocationArea>
                {loading && <LoadingIcon size="large" color="#bcc1c2" />}

                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
};
