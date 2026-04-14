import React from 'react'
import './Stocks.css'
import FeatherIcon from 'feather-icons-react';
import { addSymbol } from '../../api/api';
export default function Symbol( props ) {

    const { desc, displaySymbol, symbol, type } = props;

    const handleAdd = () =>{
        addSymbol(symbol);
    }

    return (
    <div className='stock'>
        <div className="stock-info">
            <div className="stock-value">
                <h2>{symbol}</h2>
            </div>
            <div className="stock-value">
                <label>Descrção:</label>
                <scan>&nbsp; {desc}</scan>
            </div>
            <div className="stock-value">
                <label>Display:</label>
                <scan>&nbsp; {displaySymbol}</scan>
            </div>
            <div className="stock-value">
                <label>Tipo:</label>
                <scan>&nbsp; {type}</scan>
            </div>
        </div>
        <button className='stock-btn' onClick={handleAdd}>
            <FeatherIcon icon='plus-circle' stroke='white'/>
        </button>
    </div>
  )
}
