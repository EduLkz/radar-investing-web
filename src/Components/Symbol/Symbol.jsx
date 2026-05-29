import React, { useState } from 'react'
import './Symbol.css'
import FeatherIcon from 'feather-icons-react';
import { addSymbol, getSymbolLast } from '../../api/api';
import StockBuy from '../ModalWindows/StockBuy/StockBuy';
import { useSelector } from 'react-redux';

export default function Symbol( props ) {

    const { desc, displaySymbol, symbol, type } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbolInfo, setSymbolInfo] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    
  const isLogged = useSelector((state) => state.user.logged)


    const executeBuy = () => {
       
            
    }

    const openModal = async () => {
        if(!isLogged){
            alert('Faça login para comprar');
            return;
        }
        try {
            setIsLoading(true); 
            
            const value = await getSymbolLast(symbol);
            
            if (value && value.length >= 5) {
                setSymbolInfo({
                    symbol,
                    desc,
                    open: value[0],
                    high: value[1],
                    low: value[2],
                    close: value[3],
                });
                setIsModalOpen(true);
            } else {
                console.error("Dados da API vieram vazios ou incorretos:", value);
                alert("Não foi possível carregar o preço da ação no momento.");
            }
        } catch (error) {
            console.error("Erro ao buscar a ação na API:", error);
        } finally {
            setIsLoading(false); 
        }
    }

    return (
    <div className='symbol'>
        
        <div className="stock-info">
            <div className="stock-value">
                <h2>{symbol}</h2>
            </div>
            <div className="stock-value">
                <label>Descrção:</label>
                <p>&nbsp; {desc}</p>
            </div>
            <div className="stock-value">
                <label>Display:</label>
                <p>&nbsp; {displaySymbol}</p>
            </div>
            <div className="stock-value">
                <label>Tipo:</label>
                <p>&nbsp; {type}</p>
            </div>
        </div>
        <button className='symbol-btn' onClick={openModal}>
            <FeatherIcon icon='shopping-cart' stroke='white'/>
        </button>

        <StockBuy 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                stockData={symbolInfo}
                onConfirmBuy={executeBuy}
            />
    </div>
  )
}
