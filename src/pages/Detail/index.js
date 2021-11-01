import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonShare,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from "./styles";
import { ScrollView, Modal, Share } from "react-native";

import * as Sharing from "expo-sharing";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api, { key } from "../../services/api";

import Stars from "react-native-stars";
import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";

import { saveMovie, hasMovie, deleteMovie } from "../../utils/storage";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

  const shareMovieDetails = async () => {
    try {
      const {
        title,
        overview,
        vote_average,
        poster_path,
        release_date,
        homepage,
      } = movie;
      const genres = movie.genres.map((genre) => genre.name);
      const result = await Share.share({
        message: `Title: ${title} \nDescrição: ${overview} \nNota: ${vote_average}/10 \nData: ${release_date} 
          \nGenero: ${genres} \nSite do filme: ${homepage} \nImagem: https://image.tmdb.org/t/p/original/${poster_path}`,
      });
      if (result.action === Sharing.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Sharing.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data);
        setFavoritedMovie(isFavorite);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  async function handleFavoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
      alert("Filme removido da sua lista");
    } else {
      await saveMovie("@favoritemovie", movie);
      setFavoritedMovie(true);
      alert("Este filme foi salvo na sua lista :D");
    }
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#FFFFFF" />
        </HeaderButton>

        <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons name="bookmark" size={28} color="#FFFFFF" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#FFFFFF" />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      <ButtonShare onPress={shareMovieDetails}>
        <Feather name="share" size={24} color="#FFFFFF" />
      </ButtonShare>

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={24} color="#FFFFFF" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74A" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74A" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74A" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}
