import React, { useState } from 'react';
import './StockBuy.css';
import { addSymbol } from '../../../api/api';
import { useSelector } from 'react-redux';
import { useUpdateUserInfo } from '../../features/commom';

const StockBuy = ({ isOpen, onClose, stockData, onConfirmBuy }) => {
  const userInfo = useSelector((state) => state.user.info)

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const updateLoggedUserInfo = useUpdateUserInfo()

  if (!isOpen || !stockData) return null;

  const { symbol, desc, open, high, low, close } = stockData;

  const openPrice = parseFloat(open) || 0;
  const highPrice = parseFloat(high) || 0;
  const lowPrice = parseFloat(low) || 0;
  const closePrice = parseFloat(close) || 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const totalOrderValue = quantity * closePrice;

  const handleBuy = async () => {
    if (quantity <= 0) return;
    
    setIsLoading(true);
    
    await onConfirmBuy({
      symbol: symbol,
      quantity: Number(quantity),
      price: closePrice
    });
    
    setQuantity(1);
    setIsLoading(false);
    onClose()

    addSymbol(userInfo.email, symbol, quantity, closePrice)
    updateLoggedUserInfo(userInfo.email)
  };

  return (
    <div className="stockbuy-overlay">
      <div className="stockbuy-modal">
        
        {/* Cabeçalho */}
        <div className="stockbuy-header">
          <div className="stockbuy-title-group">
            <h2 className="stockbuy-title">{symbol}</h2>
            {desc && <p className="stockbuy-desc">{desc}</p>}
          </div>
          <button className="stockbuy-close-btn" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        {/* Resumo de Mercado */}
        <div className="stockbuy-summary">
          <div className="summary-item">
            <p className="summary-label">Open</p>
            <p className="summary-value">{formatCurrency(openPrice)}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Close</p>
            <p className="summary-value value-close">{formatCurrency(closePrice)}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Low</p>
            <p className="summary-value value-low">{formatCurrency(lowPrice)}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">High</p>
            <p className="summary-value value-high">{formatCurrency(highPrice)}</p>
          </div>
        </div>

        <div className="stockbuy-input-group">
          <label className="stockbuy-input-label">
            Quantidade 
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="stockbuy-input"
            disabled={isLoading}
          />
        </div>
        <div className="stockbuy-total-group">
          <span className="stockbuy-total-label">Total Order:</span>
          <span className="stockbuy-total-value">
            {formatCurrency(totalOrderValue)}
          </span>
        </div>

        {/* Botões */}
        <div className="stockbuy-actions">
          
          <button
            onClick={handleBuy}
            disabled={quantity <= 0 || isLoading}
            className="btn-confirm"
          >
            {isLoading ? 'Processando...' : 'Confirmar Compra'}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};

export default StockBuy;