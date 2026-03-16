import React, { useState } from "react";
import styled from "styled-components";
import useInquiry from "../../hooks/useInquiry";
import BulkInquiryModal from "./BulkInquiryModal";
import { FiTrash2 } from "react-icons/fi";

const InquiryTray = () => {
  const inquiry = useInquiry(); // ✅ SAFE

  // 🚨 guard BEFORE destructuring
  if (!inquiry || !Array.isArray(inquiry.inquiryItems)) {
    return null;
  }

  const {
    inquiryItems,
    removeItem,
    updateQty,
    clearInquiry,
  } = inquiry;

  const [openModal, setOpenModal] = useState(false);

  if (inquiryItems.length === 0) return null;

  return (
    <>
      <Tray>
        <Header>
          <span>Inquiry Tray ({inquiryItems.length})</span>
          <ClearBtn onClick={clearInquiry}>Clear All</ClearBtn>
        </Header>

        <Items>
          {inquiryItems.map((item) => (
            <Item key={item.id}>
              <Thumb>
                <img src={item.image} alt={item.name} />
              </Thumb>

              <Details>
                <h4>{item.name}</h4>
                <Qty>
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item.id, Number(e.target.value) || 1)
                    }
                  />
                </Qty>
              </Details>

              <Remove onClick={() => removeItem(item.id)}>
                <FiTrash2 />
              </Remove>
            </Item>
          ))}
        </Items>

        <Actions>
          <InquiryBtn onClick={() => setOpenModal(true)}>
            Send Inquiry
          </InquiryBtn>
        </Actions>
      </Tray>

      {openModal && (
        <BulkInquiryModal
          items={inquiryItems}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default InquiryTray;
