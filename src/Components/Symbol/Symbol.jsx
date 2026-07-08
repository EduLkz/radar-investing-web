import FeatherIcon from 'feather-icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSymbolLast } from '../../api/api';
import StockBuy from '../ModalWindows/StockBuy/StockBuy';
import './Symbol.css';

export default function Symbol( props ) {

    const { desc, displaySymbol, symbol, type } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbolInfo, setSymbolInfo] = useState(null); 
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);

    
  const isLogged = useSelector((state) => state.user.logged)


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
                // onConfirmBuy={executeBuy}
            />
    </div>
  )
}
