import { useState } from 'react';
import { searchCompany } from '../../api/api';
import './Search.css';
import Symbol from '../../Components/Stocks/Symbol'

export default function Search() {
    const [searchType, setSearchType] = useState('');
    const [stocks, setStocks] = useState([])

    const handleChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        const value = await searchCompany(searchType)
        setStocks(value);
        console.log(stocks.length);
    }


    return (
        <div className="search">
            <div className="search-head">
                <h2>Procure Empresa:</h2>
                <input placeholder='IBM' onChange={(e) => handleChange(e)}/>
                <button onClick={handleSearch}>procurar</button>
            </div>
            <div className="stocks">
                {
                    stocks.length > 0  ? (
                        stocks.map((s, idx) => (
                            <Symbol key={`${s.symbol}${idx}`}
                                symbol={s.symbol}
                                desc={s.description}
                                displaySymbol={s.displaySymbol}
                                type={s.type}
                            />
                        ))
                    ) : <></>
                }
            </div>
        </div>
    )
}
