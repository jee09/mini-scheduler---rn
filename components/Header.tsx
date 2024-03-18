import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView>
      <Container>
        <Title>Day:Day</Title>
      </Container>
    </SafeAreaView>
  );
};
export default Header;

const Container = styled.View`
  height: 50px;
  /* background-color: linear-gradient(90deg, #009e40 0%, #c5ffd1 100%); */
  background-color: #9ecda7;
  justify-content: center;
  padding: 0 20px;
`;
const Title = styled.Text`
  color: white;
  font-size: 23px;
  font-weight: 700;
`;
