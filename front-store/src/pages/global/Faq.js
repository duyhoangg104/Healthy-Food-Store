import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles/faq.scss";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item__wrapper rounded shadow-sm cursor-pointer">
      <div
        className="question-faq__item p-3 d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <strong> {item.question} </strong>
        <div>
          {isOpen ? <BsChevronUp size={24} /> : <BsChevronDown size={24} />}
        </div>
      </div>
      <div className={`answer-faq__item ${isOpen ? "open" : ""}`}>
        {item.answer}
      </div>
    </div>
  );
};

FaqItem.propTypes = {
  item: PropTypes.object.isRequired,
};

// eslint-disable-next-line react/no-multi-comp
const Faq = () => {
  const faqList = [
    {
      id: "1",
      question: "Bao nhiêu lâu thì nhận được hàng?",
      answer:
        "Nếu quý khách ở nội thành Tp. Hà Nội sẽ nhận được hàng trong vòng 15-20 phút, quý khách ở các tỉnh khác hoặc ngoại thành Hà Nội quá 15km thì chúng tôi không thể phục vụ được vì lí do bảo quản sản phẩm ở chất lượng tốt nhất.",
    },
    {
      id: "2",
      question:
        "Người không rèn luyện thao có cần phải ăn theo lượng kcal được tính cho mỗi ngày không?",
      answer:
        "Bất kể là người có hoạt động thể dục thể thao hay không thì cũng nên có bữa ăn đáp ứng vừa đủ năng lượng để tránh tình trạng thừa hoặc thiếu năng lượng gây răng tăng cân hoặc sụt cân nặng.",
    },
    {
      id: "3",
      question: "Khẩu phần ăn tự chọn có giảm cân hiệu quả không?",
      answer:
        "Nếu lựa chọn khẩu phần ăn với lượng năng lượng (kcal) thấp hơn so với năng lượng mỗi ngày một chút thì có thể giảm cân hiệu quả.",
    },
    {
      id: "4",
      question: "Mua hóa đơn bao nhiêu thì được miễn phí ship?",
      answer:
        "Để đảm bảo thời gian giao hàng nhanh chóng và cam kết chất lượng sản phẩm dinh dưỡng tốt nhất ngay sau khi được chế biến nên chúng tôi không miễn phí ship, tuy nhiên chúng tôi sẽ thường xuyên có chương trình ưu đãi với các mã giảm giá và miễn phí ship, quý khách vui lòng theo dõi để có được những ưu đãi về giá cả hấp dẫn nhất.",
    },
  ];

  return (
    <div className="faq-container my-5">
      <div className="container">
        <div className="page-title">
          <h1 className="text-uppercase">những câu hỏi thường gặp</h1>
        </div>
        <div className="faq-list mt-5">
          {faqList.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
