import React from 'react'
import './Stocks.css'
import FeatherIcon from 'feather-icons-react';
export default function Stocks( props ) {

    const { symbol, open, high, low, close } = props;
    const percent = (close - open) / open * 100;
  return (
    <div className='stock'>
        <div className="stock-info">
            <div className="stock-value">
                <h2>{symbol}</h2>
            </div>
            <div className="stock-value">
                <label>Abertura:</label>
                <scan className={close > open ? 'positive' : 'negative'}>&nbsp; {open}</scan>
            </div>
            <div className="stock-value">
                <label>Alta: </label>
                <scan className={high > low ? 'positive' : 'negative'}>&nbsp; {high}</scan>
            </div>
            <div className="stock-value">
                <label>Baixa: </label>
                <scan className={high > low ? 'positive' : 'negative'}>&nbsp; {low}</scan>
            </div>
            <div className="stock-value">
                <label>Fechamento:</label>
                <scan className={close > open ? 'positive' : 'negative'}>&nbsp; {close}</scan>
            </div>
            <div className="stock-value">
                <label>Percentual:</label>
                <scan className={percent > 0 ? 'positive' : 'negative'}>&nbsp;{percent.toFixed(2)}%</scan>
            </div>
        </div>
        <button className='stock-btn'>
            <FeatherIcon icon='minus-circle' stroke='white'/>
        </button>
    </div>
  )
}
