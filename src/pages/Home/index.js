import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from "./styles";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import { Feather } from "@expo/vector-icons";

import api, { key } from "../../services/api";
import { getListMovies } from "../../utils/movie";

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive;

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);

      const nowList = await getListMovies(10, nowData.data.results);
      const popularList = await getListMovies(5, popularData.data.results);
      const topList = await getListMovies(5, topData.data.results);

      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);

      console.log(nowData);
      console.log(nowList);
    }

    getMovies();
  }, []);

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Ex. Vingadores" placeholderTextColor="#DDDDDD" />
        <SearchButton>
          <Feather name="search" size={30} color="#FFFFFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>

        <BannerButton activeOpacity={0.8} onPress={() => alert("Teste")}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: "https://ingresso-a.akamaihd.net/prd/img/movie/shang-chi-e-a-lenda-dos-dez-aneis/99cd42d9-5d27-4a96-aa28-c5bf4c9b6fb5.jpg",
            }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
