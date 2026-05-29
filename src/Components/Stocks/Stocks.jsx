import React, { useState } from 'react'
import './Stocks.css'
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router';
import StockSell from '../ModalWindows/StockSell/StockSell';

export default function Stocks( props ) {

    const { symbol, qnt: qntStr, valueAvg: valueAvgStr, currentValue: currentValueStr, variation: variationStr, performance: performanceStr, profit: profitStr } = props;

    const qnt = parseFloat(qntStr) || 0;
    const valueAvg = parseFloat(valueAvgStr) || 0;
    const currentValue = parseFloat(currentValueStr) || 0;
    const variation = parseFloat(variationStr) || 0;
    const performance = parseFloat(performanceStr) || 0;
    const profit = parseFloat(profitStr) || 0;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbolInfo, setSymbolInfo] = useState(null); 
    

    const navigate = useNavigate()

    const handleClickBuy = () => {
        navigate('/');
    }

    const handleClickSell = () => {
        setSymbolInfo({
                symbol,
                qnt,
                valueAvg,
                variation,
                performance
            });
        setIsModalOpen(true);
    }

    return (
        <div className='stock'>
            <div className="stock-info">
                <div className="stock-value-title">
                    <h2 className="stock-title">{symbol}</h2>
                </div>
                <div className="stock-info-sub">
                    <div className="stock-value">
                        <label>Quantidade:</label>
                        <p>&nbsp; {qnt.toFixed(2)}</p>
                    </div>
                    <div className="stock-value">
                        <label>Valor Médio: </label>
                        <p className={valueAvg > currentValue ? 'positive' : 'negative'}>&nbsp; {valueAvg.toFixed(2)}</p>
                    </div>
                    <div className="stock-value">
                        <label>Valor Atual: </label>
                        <p className={valueAvg < currentValue ? 'positive' : 'negative'}>&nbsp; {currentValue.toFixed(2)}</p>
                    </div>
                    <div className="stock-value">
                        <label>Variação: </label>
                        <p className={valueAvg > variation ? 'positive' : 'negative'}>&nbsp; 
                            {variation.toFixed(2)}%
                        </p>
                    </div>
                    <div className="stock-value">
                        <label>Rentabilidade:</label>
                        <p className={performance > qnt ? 'positive' : 'negative'}>&nbsp; {performance.toFixed(2)}%</p>
                    </div>
                    <div className="stock-value">
                        <label>Saldo:</label>
                        <p className={profit > 100 ? 'positive' : 'negative'}>&nbsp;{profit.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <button className='stock-btn' onClick={handleClickSell}>
                <FeatherIcon icon='dollar-sign' stroke='white'/>
            </button>

            <StockSell 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                stockData={symbolInfo}
                // onConfirmBuy={executeBuy}
            />
        </div>
    )
}
