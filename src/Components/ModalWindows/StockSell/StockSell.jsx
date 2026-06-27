import React, { useEffect, useState } from 'react';
import '../StockBuy/StockBuy';
import { addSymbol, getMakeSaleInfo, getPreviewSaleInfo, updateUserStocksInfo, updateWalletInfo } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateStocks } from '../../features/User/userSlice';

  const StockSell = ({ isOpen, onClose, stockData, onConfirmBuy }) => {
  const userInfo = useSelector((state) => state.user.info)

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [costPrice, setCostPrice] = useState(0);
  const [profitValue, setProfitValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if(isOpen){
        updateValues(parseFloat(custo_original_total), parseFloat(lucro_prejuizo), parseFloat(valor_bruto_venda));
      }else{
        setQuantity(1);
      }
    }, [isOpen])

  if (!isOpen || !stockData) return null;

  const { custo_original_total, lucro_prejuizo, valor_bruto_venda, symbol, max_qnt } = stockData;

  const updateValues = (cost, profit, sell) => {
    setCostPrice(cost)
    setProfitValue(profit)
    setSellValue(sell)
  }
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };


  const handleUpdateQuantity = async(qnt) => {
    setQuantity(qnt)
    if(qnt > max_qnt || qnt < 0) return;
    if(qnt === '' || qnt === null || qnt === undefined) return;
    const preview = await getPreviewSaleInfo(userInfo.email, symbol, qnt)
    updateValues(preview.custo_original_total, preview.lucro_prejuizo, preview.valor_bruto_venda)
  }

  const handleSell = async () => {
    if(quantity > max_qnt || quantity < 0) return;
    if(quantity === '' || quantity === null || quantity === undefined) return;
    setIsLoading(true);
    
    const sale = await getMakeSaleInfo(userInfo.email, symbol, quantity)
    const wallet = await updateWalletInfo(userInfo.email)
    const updatedWallet = {
        balance: wallet[0],
        performance: wallet[1],
        variation: wallet[2],
        profit: wallet[3],
        variation_details: wallet[4],
    }
        
            
    const stocks = await updateUserStocksInfo(userInfo.email, updatedWallet['variation_details'])
    await dispatch(updateStocks(stocks))
    setIsLoading(false)
    onClose()
  };

  return (
    <div className="stockbuy-overlay">
      <div className="stockbuy-modal">
        
        {/* Cabeçalho */}
        <div className="stockbuy-header">
          <div className="stockbuy-title-group">
            <h2 className="stockbuy-title">{symbol}</h2>
          </div>
          <button className="stockbuy-close-btn" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        {/* Resumo de Mercado */}
        <div className="stockbuy-summary">
          <div className="summary-item">
            <p className="summary-label">Custo original</p>
            <p className="summary-value">{formatCurrency(costPrice)}</p>
          </div>

          <div className="summary-item">
            <p className="summary-label">Quantidade a venda</p>
            <p className="summary-value value-close">{(quantity)}/{max_qnt}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Valor venda</p>
            <p className="summary-value value-low">{formatCurrency(sellValue)}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Lucro</p>
            <p className="summary-value value-high">{formatCurrency(profitValue)}</p>
          </div>
        </div>

        <div className="stockbuy-input-group">
          <label className="stockbuy-input-label">
            Quantidade 
          </label>
          <input
            type="number"
            min="1"
            max={max_qnt}
            step="1"
            value={quantity}
            onChange={(e) => handleUpdateQuantity(e.target.value)}
            className="stockbuy-input"
            disabled={isLoading}
          />
        </div>
        <div className="stockbuy-total-group">
          <span className="stockbuy-total-label">Valor Total:</span>
          <span className="stockbuy-total-value">
            {formatCurrency(sellValue)}
          </span>
        </div>

        {/* Botões */}
        <div className="stockbuy-actions">
          
          <button
            onClick={handleSell}
            disabled={quantity <= 0 || isLoading}
            className="btn-confirm"
          >
            {isLoading ? 'Processando...' : 'Confirmar Venda'}
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

export default StockSell;