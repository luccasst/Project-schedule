import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import { Svg } from 'react-native-svg';
import FavoritIcon from '../../assets/coracao.png';
import BackIcon from '../../assets/seta-esquerda.png';
import {
  Container,
  Scroller,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,

  FakeSwiper,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,

  UserAvatar,
  UserAvatarImage,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,

  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText
} from './styles';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars
  });
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://192.168.0.39:3010/services/${userInfo.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Erro ao buscar serviços:', response.status);
          // Lógica para tratar o erro, se necessário
        }
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        // Lógica para tratar o erro, se necessário
      } finally {
        setLoading(false);
      }
    }

    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ?
          <Swiper
            style={{ height: 240 }}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
            autoplay={true}
          >
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
          :
          <FakeSwiper></FakeSwiper>
        }
        <PageBody>
          <UserInfoArea>
            <UserAvatar >
              <UserAvatarImage source={{ uri: userInfo.avatar }} />
            </UserAvatar>
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton>
              <View>
                <Image source={FavoritIcon} style={{ width: 24, height: 24 }} />
              </View>
            </UserFavButton>
          </UserInfoArea>

          {loading &&
            <LoadingIcon size="large" color="#080707" />
          }

          {services.length > 0 &&
            <ServiceArea>
              <ServicesTitle>Lista de serviços</ServicesTitle>

              {services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R${item.price}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          }
          <TestimonialArea>

          </TestimonialArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <View>
          <Image source={BackIcon} style={{ width: 20, height: 20 }} />
        </View>
      </BackButton>
    </Container>
  )
}
