/** @format */

import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductsByCategory from "../../../components/global/productByCategory";
import {
  removeProductFromWishListRequest,
  addProductToWishListRequest,
  searchProductByTitleRequest,
} from "../../../store/api";
import {
  useGetCategoryListQuery,
  useGetProductListQuery,
} from "../../../store/services/products";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../../../store/slice/authSlice";
import { addProductToCart, calcTotal } from "../../../store/slice/cartSlice";
import { handleUnauthorizedRedirect } from "../../../utils/redirect";
import { handleShowNotification } from "../../../utils/event";
import ProductListSkeleton from "../../../skeleton/ProductListSkeleton";
import { store } from "../../../store";
import { checkProductExistOnCart } from "../../../utils/helper";

export const removeProductFromFavoriteListUtil = async (
  product,
  dispatch,
  setProductList,
  history,
  refetch
) => {
  try {
    const { data: dataFavorite } = await removeProductFromWishListRequest(
      product
    );
    dispatch(removeProductFromWishList(product));
    handleShowNotification(
      "Sản phẩm đã được gỡ khỏi mục yêu thích",
      "success",
      dispatch
    );
    if (refetch) {
      refetch();
      return;
    }
    setProductList((prevState) =>
      prevState.map((item) =>
        item._id === product
          ? {
              ...item,
              favorites: item.favorites.filter(
                (user) => user !== dataFavorite.user
              ),
            }
          : item
      )
    );
  } catch (error) {
    handleUnauthorizedRedirect(error?.response?.status, history, dispatch);
    console.log(error);
  }
};

export const addProductToFavoriteUtil = async (
  product,
  dispatch,
  setProductList,
  history
) => {
  try {
    const { data: dataFavorite } = await addProductToWishListRequest(product);
    dispatch(addProductToWishList(product));
    handleShowNotification(
      "Sản phẩm đã được thêm vào mục yêu thích",
      "success",
      dispatch
    );
    setProductList((prevState) =>
      prevState.map((item) =>
        item._id === product
          ? {
              ...item,
              favorites: [...item.favorites, dataFavorite.user],
            }
          : item
      )
    );
  } catch (error) {
    handleUnauthorizedRedirect(error?.response?.status, history, dispatch);
    console.log(error);
  }
};

export const addProductToCartUtil = (product, qty, dispatch, setQty) => {
  const { cart } = store.getState();

  const itemInCart = checkProductExistOnCart(product, cart.list);

  setQty(itemInCart && itemInCart.qty < 100 ? qty + 1 : qty);

  dispatch(
    addProductToCart({
      ...product,
      qty: itemInCart && itemInCart.qty < 100 ? qty + 1 : qty,
    })
  );
  dispatch(calcTotal());
  handleShowNotification(
    "Sản phẩm đã được thêm vào giỏ hàng",
    "success",
    dispatch
  );
};

const Menu = () => {
  const { data, isLoading } = useGetCategoryListQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const params = new URL(document.location).searchParams;
  const cId = params.get("cId");
  const q = params.get("q");
  const [searching, setSearching] = useState(false);

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching,
  } = useGetProductListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !!q,
  });

  useEffect(() => {
    if (productsData && !cId) {
      setProductList(productsData.filter((p) => p.status === "normal"));
    }
    if (productsData && cId) {
      setProductList(productsData.filter((item) => item.category === cId));
    }
  }, [productsData, cId]);

  useEffect(() => {
    if (q) {
      searchProductByTitleHandler(q);
    }
  }, [q]);

  const addProductToCartHandler = (product, qty, setQty) => {
    addProductToCartUtil(product, qty, dispatch, setQty);
  };

  const addToFavoriteHandler = async (product) => {
    addProductToFavoriteUtil(product, dispatch, setProductList, history);
  };

  const removeProductFromFavoritesHandler = async (product) => {
    removeProductFromFavoriteListUtil(
      product,
      dispatch,
      setProductList,
      history
    );
  };

  async function searchProductByTitleHandler(title) {
    setSearching(true);
    try {
      const { data } = await searchProductByTitleRequest(title.trim());
      setProductList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="menu-page">
          <div className="product-section my-5">
            {(isLoading || productsLoading || isFetching || searching) && (
              <ProductListSkeleton />
            )}
            {!searching && q && !productList.length && (
              <div className="text-danger text-center">
                <img
                  src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
                  alt="Sản phẩm bạn tìm kiếm không có trong gian hàng"
                  className="w-50 d-block mb-4 mx-auto"
                />
                <p>Sản phẩm bạn tìm kiếm không có trong gian hàng</p>
              </div>
            )}
            {data?.map((category) => (
              <ProductsByCategory
                key={category._id}
                category={category}
                products={
                  productList.filter(
                    (item) => item.category === category._id
                  ) || []
                }
                addProductToCartHandler={addProductToCartHandler}
                addToFavoriteHandler={addToFavoriteHandler}
                removeProductFromFavoritesHandler={
                  removeProductFromFavoritesHandler
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
