/** @format */

import React, { useEffect, useState } from "react";
import "./styles/wishlist.scss";
import BottomBanner from "../../components/global/bottomBanner";
import ProductItem from "../../components/global/productItem";
import { useGetMyWishListQuery } from "../../store/services/users";
import { setFavoritesData } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCartUtil,
  removeProductFromFavoriteListUtil,
} from "./menu";
import { useHistory } from "react-router-dom";
import { checkProductExistOnCart } from "../../utils/helper";
import ProductListSkeleton from "../../skeleton/ProductListSkeleton";
import EmptyCart from "../../components/global/EmptyCart";

const WishList = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    data: dataWishList,
    isLoading,
    refetch,
    isFetching,
  } = useGetMyWishListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !isAuthenticated,
  });
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.cart);
  const [productList, setProductList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (dataWishList) {
      setProductList(dataWishList);
      dispatch(setFavoritesData(dataWishList.map((item) => item._id)));
    }
  }, [dataWishList]);

  useEffect(() => {
    if (!isAuthenticated) {
      setProductList([]);
      dispatch(setFavoritesData([]));
    }
  }, [isAuthenticated]);

  const addProductToCartHandler = (product, qty, setQty) => {
    addProductToCartUtil(product, qty, dispatch, setQty);
  };

  const removeProductFromFavoritesHandler = async (product) => {
    removeProductFromFavoriteListUtil(
      product,
      dispatch,
      setProductList,
      history,
      refetch
    );
  };

  return (
    <div className="my-5">
      <div className="container">
        {(isLoading || isFetching) && <ProductListSkeleton hideTitle />}
        {!isLoading && productList?.length === 0 && (
          <EmptyCart
            title="Sản phẩm yêu thích trống"
            subTitle=" vui lòng chọn thêm sản phẩm"
          />
        )}
        <div className="productList">
          <div className="page-title text-left">
            <div className="list">
              {productList?.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  removeProductFromFavoritesHandler={
                    removeProductFromFavoritesHandler
                  }
                  addProductToCartHandler={addProductToCartHandler}
                  isInCart={checkProductExistOnCart(product, list)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
};

export default WishList;
