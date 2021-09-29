import React from "react";
import { ScrollView } from "react-native";

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
} from "./styles";

import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";

function Home() {
  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Ex. Vingadores" placeholderTextColor="#DDDDDD" />
        <SearchButton>
          <Feather name="search" size={30} color="#FFFFFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView>
        <Title>Em Cartaz</Title>

        <BannerButton activeOpacity={0,8} onPress={ () => alert('Teste')}>
          <Banner
           resizeMethod="resize"
            source={{
              uri: "https://ingresso-a.akamaihd.net/prd/img/movie/shang-chi-e-a-lenda-dos-dez-aneis/99cd42d9-5d27-4a96-aa28-c5bf4c9b6fb5.jpg",
            }}
          />
        </BannerButton>
      </ScrollView>
    </Container>
  );
}

export default Home;
