import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FiX, FiPlus, FiMinus, FiSend, FiDownload } from 'react-icons/fi';
import { useInquiry } from '../../contexts/InquiryContext';

const BulkInquiryCart = ({ isOpen, onClose }) => {
  const { items, updateQty, removeItem, clearAll, getTotalQuantity } = useInquiry();

  const handleQtyChange = (id, newQty) => {
    const setQty = Math.max(10, Math.ceil(newQty / 10) * 10);
    updateQty(id, setQty);
  };

  const handleWhatsAppInquiry = () => {
    if (items.length === 0) {
      toast.error('Please add items to inquiry.');
      return;
    }
    
    console.log('Sending inquiry for items:', items);
    
    // Professional format with proper structure
    const itemsList = items.map((item, index) => 
      `${index + 1}. ${item.name}\n   Category: ${item.category}\n   Quantity: ${(item.qty || 10) / 10} Sets (${item.qty || 10} pieces)\n`
    ).join('\n');
    
    const message = `*BULK WHOLESALE INQUIRY*\n\nDear Team,\n\nI am interested in placing a bulk order for the following products:\n\n${itemsList}\n━━━━━━━━━━━━━━━━━━━━\n*SUMMARY*\n📦 Total Products: ${items.length}\n📊 Total Pieces: ${getTotalQuantity()}\n━━━━━━━━━━━━━━━━━━━━\n\nKindly provide:\n✓ Bulk pricing details\n✓ Availability status\n✓ Delivery timeline\n✓ Payment terms\n\nLooking forward to your response.\n\nThank you!`;
    
    const phoneNumber = '919265282488';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    toast.success(`Inquiry sent for ${items.length} products!`);
  };

  const handleDownloadInquiry = () => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.category}) - Sets: ${(item.qty || 10) / 10} (${item.qty || 10} pieces)`
    ).join('\n');
    
    const text = `Bulk Inquiry Request:\n\nProduct Sets (${items.length} products):\n${itemsList}\n\nTotal Pieces: ${getTotalQuantity()}\n\nPlease provide bulk pricing and availability.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-inquiry-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CartContainer $isOpen={isOpen}>
      <CartHeader>
        <h3>Bulk Inquiry ({items.length} Products)</h3>
        <CloseBtn onClick={onClose}>
          <FiX />
        </CloseBtn>
      </CartHeader>

      <CartItems>
        {items.length === 0 ? (
          <EmptyState>
            <h4>No items in inquiry</h4>
            <p>Add products to create a bulk inquiry</p>
          </EmptyState>
        ) : (
          items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.images?.[0] || item.image} alt={item.name} />
              <ItemInfo>
                <h4>{item.name}</h4>
                <div className="category">{item.category}</div>
                <QtyControls>
                  <button onClick={() => handleQtyChange(item.id, (item.qty || 10) - 10)}>
                    <FiMinus />
                  </button>
                  <div>
                    <div className="qty-display">{(item.qty || 10) / 10} Sets</div>
                    <div className="set-label">({item.qty || 10} pieces)</div>
                  </div>
                  <button onClick={() => handleQtyChange(item.id, (item.qty || 10) + 10)}>
                    <FiPlus />
                  </button>
                </QtyControls>
              </ItemInfo>
              <RemoveBtn onClick={() => removeItem(item.id)}>
                <FiX />
              </RemoveBtn>
            </CartItem>
          ))
        )}
      </CartItems>

      {items.length > 0 && (
        <CartFooter>
          <Summary>
            <div className="total-items">Total: {items.length} Products ({getTotalQuantity()} pieces)</div>
            <div className="bulk-note">
              💼 Ready to send inquiry via WhatsApp
            </div>
          </Summary>
          
          <ActionButtons>
            <ActionBtn className="primary" onClick={handleWhatsAppInquiry}>
              <FiSend />
              Send Inquiry via WhatsApp
            </ActionBtn>
            
            <ActionBtn className="secondary" onClick={handleDownloadInquiry}>
              <FiDownload />
              Download Inquiry List
            </ActionBtn>
          </ActionButtons>
        </CartFooter>
      )}
    </CartContainer>
  );
};

export default BulkInquiryCart;

const CartContainer = styled.div`
  position: fixed;
  top: var(--banner-height, 0px);
  right: 0;
  width: 100vw;
  height: calc(100vh - var(--banner-height, 0px));
  background: white;
  z-index: 3600;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  transition: top 0.3s ease, height 0.3s ease;
  
  @media (min-width: 1025px) {
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-450px')};
    width: 400px;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease, top 0.3s ease, height 0.3s ease;
  }
`;

const CartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    color: #333;
  }
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  img {
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }
  
  .category {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  button {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #a47148;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #a47148;
    
    &:hover {
      background: #a47148;
      color: white;
    }
  }
  
  .qty-display {
    min-width: 60px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
  }
  
  .set-label {
    font-size: 0.7rem;
    color: #666;
    margin-top: 0.2rem;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.2rem;
  
  &:hover {
    color: #ff4757;
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
`;

const Summary = styled.div`
  margin-bottom: 1rem;
  
  .total-items {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .bulk-note {
    font-size: 0.8rem;
    color: #a47148;
    background: rgba(164, 113, 72, 0.1);
    padding: 0.5rem;
    border-radius: 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ActionBtn = styled.button`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: #a47148;
    color: white;
    
    &:hover {
      background: #8b5a3c;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    
    &:hover {
      background: #e0e0e0;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  
  h4 {
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
  }
`;
