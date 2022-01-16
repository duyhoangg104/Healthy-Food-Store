import React from "react";
import PropTypes from "prop-types";
import IconLoader from "../../components/ui/iconLoader";

const PaymentButton = ({
  item,
  handleCreatePayment,
  isLoading,
  currentOrderId,
}) => {
  return (
    <div>
      {item.paidAt ? (
        <button className="btn-green divDisable sm">
          Paid at {item.paidAt.substr(0, 10)}
        </button>
      ) : (
        <button
          className="btn-green"
          onClick={() => handleCreatePayment(item._id)}
        >
          {isLoading && currentOrderId === item._id && <IconLoader />} Pay
        </button>
      )}
    </div>
  );
};

PaymentButton.propTypes = {
  item: PropTypes.object,
  handleCreatePayment: PropTypes.func,
  isLoading: PropTypes.bool,
  currentOrderId: PropTypes.string,
};

export default PaymentButton;
