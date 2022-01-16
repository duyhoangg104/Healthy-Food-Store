import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IconLoader from "../../components/ui/iconLoader";
import { paidAnOrderRequest } from "../../store/api";
import { handleShowNotification } from "../../utils/event";
import { useHistory } from "react-router-dom";

const OrderThank = () => {
  const params = new URL(document.location).searchParams;
  const paymentId = params.get("paymentId");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePaidOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await paidAnOrderRequest({ paymentId });
      handleShowNotification(data.msg, "success", dispatch);
      setSuccess(true);
      setTimeout(() => {
        history.push("/customer-profile/orders");
      }, 1500);
    } catch (error) {
      setError(error?.response?.data || {});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePaidOrder();
  }, [paymentId]);

  return (
    <div className="my-5">
      <div className="container">
        <p className="text-center">Cảm ơn bạn đã mua hàng</p>
        <div className="d-flex justify-content-center my-4">
          <button
            className={`btn-green ${error ? "red" : ""} ${
              success ? "d-none" : ""
            }`}
            onClick={() => {
              if (!isLoading) {
                handlePaidOrder();
              }
            }}
          >
            {isLoading ? (
              <>
                <IconLoader /> Processing
              </>
            ) : error ? (
              <> Failed. Click to try again </>
            ) : (
              <> {""} </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderThank;
