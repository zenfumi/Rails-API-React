import React, { Fragment, useReducer, useEffect } from "react";
import styled from "styled-components";
// --- ここから追加 ---
import { Link } from "react-router-dom";
// --- ここまで追加 ---

// --- ここから追加 ---
// components
import Skeleton from "@material-ui/lab/Skeleton";
// --- ここまで追加 ---

// apis
import { fetchRestaurants } from "../apis/restaurants";

// reducers
import {
  initialState,
  restaurantsActionTyps,
  restaurantsReducer,
} from "../reducers/restaurants";

// --- ここから追加 ---
// constants
import { REQUEST_STATE } from "../constants";
// --- ここまで追加 ---

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
// --- ここから追加 ---
import RestaurantImage from "../images/restaurant-image.jpg";
// --- ここまで追加 ---

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

// --- ここから追加 ---
const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;
// --- ここまで追加 ---

export const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTyps.FETCHING });
    fetchRestaurants().then((data) =>
      dispatch({
        type: restaurantsActionTyps.FETCH_SUCCESS,
        payload: {
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
          </Fragment>
        ) : (
          state.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </Fragment>
  );
};
