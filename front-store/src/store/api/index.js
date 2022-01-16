/** @format */

export { authUserRequest, registerUserRequest } from "./auth";
export {
  createUserRequest,
  verifyEmailRequest,
  getUserListRequest,
  resetPasswordRequest,
  updateMyInfoRequest,
  updateMyPasswordRequest,
  addProductToWishListRequest,
  deleteUserRequest,
  removeProductFromWishListRequest,
  confirmRegisterRequest,
  updateAddressInfoRequest,
} from "./users";

export {
  createProductRequest,
  editProductRequest,
  deleteProductRequest,
  searchProductByTitleRequest,
  toggleProductStatusRequest,
} from "./product";

export { getMyTdeeDataRequest, createNewTdeeIndexRequest } from "./tdee";

export {
  createOrderRequest,
  assignOrderToShipperRequest,
  handleAssignedOrderRequest,
  removeOrderHistoryRequest,
  paidAnOrderRequest,
  cancelOrderRequest,
  createOrderPaymentRequest,
} from "./orders";

export { createCategoryRequest, toggleCategoryTypeRequest } from "./category";

export { createMealRequest, removeMealItemProductRequest } from "./meal";

export { getRoleListRequest } from "./role";

export {
  createCouponRequest,
  toggleCouponActivatedStatusRequest,
  applyCouponRequest,
} from "./coupon";
