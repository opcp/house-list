import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components";
import ListingItem from "../Components/Listing/ListingItem";

const ListingWrapper = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const Listings = styled(FlatList)`
  width: 100%;
  padding: 2%;
`;

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    try {
      const data = await fetch(
        "https://my-json-server.typicode.com/PacktPublishing/React-Projects/listings"
      );
      const dataJSON = await data.json();

      if (dataJSON) {
        setData(dataJSON);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <ListingWrapper>
      {!loading && !error && (
        <Listings
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ListingItem item={item} navigation={navigation} />}
        />
      )}
    </ListingWrapper>
  );
};

export default Home;
