import React, { useEffect, useState } from 'react';
import { 
  Container,
  Header, 
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from './styles';
import { ScrollView, Modal } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api, { key } from '../../services/api';

export default function Datail(){
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(()=>{
    let isActive = true;

    async function getMovie(){
      const response = await api.get(`/movie/${route.params?.id}`, {
        params:{
          api_key: key,
          language: 'pt-BR'
        }
      })
      .catch((err)=> {
        console.log(err)
      })

      if(isActive){
        setMovie(response.data);
        
        const isFavorite = hasMovie(response.data);
        setFavorite(isFavorite);
      }
    }

    if(isActive){
      getMovie();
    }

    return ()=> {
      isActive = false;
    }
  },[]);

  return(
    <Container>
      <Header>
        <HeaderButton
          onPress={()=> navigation.goBack()}
        >
          <Feather 
            name="arrow-left"
            size={28}
            color="#FFF"
          />
        </HeaderButton>
        <HeaderButton>          
            <Ionicons 
            name="bookmark"
            size={28}
            color="#FFF"
          />         
        </HeaderButton>
      </Header>     
    </Container>
  )
};
