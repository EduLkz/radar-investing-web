import React, { useState } from 'react'
import './StockSearch.css'
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router';
import StockSell from '../ModalWindows/StockSell/StockSell';

export default function StockSearch( props ) {

    const { symbol, open: openStr, high: highStr, low: lowStr, close: closeStr, buy } = props;

    const open = parseFloat(openStr) || 0;
    const high = parseFloat(highStr) || 0;
    const low = parseFloat(lowStr) || 0;
    const close = parseFloat(closeStr) || 0;
    const percent = (close - open) / open * 100;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbolInfo, setSymbolInfo] = useState(null); 
    

    const navigate = useNavigate()

    const handleClickBuy = () => {
        navigate('/');
    }

    const handleClickSell = () => {
        setSymbolInfo({
                symbol,
                open,
                high,
                low,
                close
            });
        setIsModalOpen(true);
    }

    return (
        <div className='stock-search'>
            <div className="stock-search-info">
                <div className="stock-search-value-title">
                    <h2 className="stock-search-title">{symbol}</h2>
                </div>
                <div className="stock-search-info-sub">
                    <div className="stock-search-value">
                        <label>Abertura:</label>
                        <p className={close > open ? 'positive' : 'negative'}>&nbsp; {open.toFixed(2)}</p>
                    </div>
                    <div className="stock-search-value">
                        <label>Alta: </label>
                        <p className={high > low ? 'positive' : 'negative'}>&nbsp; {high.toFixed(2)}</p>
                    </div>
                    <div className="stock-search-value">
                        <label>Baixa: </label>
                        <p className={high > low ? 'positive' : 'negative'}>&nbsp; 
                            {low.toFixed(2)}
                        </p>
                    </div>
                    <div className="stock-search-value">
                        <label>Fechamento:</label>
                        <p className={close > open ? 'positive' : 'negative'}>&nbsp; {close.toFixed(2)}</p>
                    </div>
                    <div className="stock-search-value">
                        <label>Percentual:</label>
                        <p className={percent > 0 ? 'positive' : 'negative'}>&nbsp;{percent.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <button className='stock-search-btn'>
                <FeatherIcon icon='dollar-sign' stroke='white'/>
            </button>

            
        </div>
    )
}
