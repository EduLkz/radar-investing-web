import { useEffect, useState } from 'react';
import { getCurrencies, getNews, searchCompany, searchDaily } from '../../api/api';
import Symbol from '../../Components/Symbol/Symbol';
import StockChart from '../JsonLineChart';
import StockSearch from '../StockSearch/StockSearch';
import './Search.css';

export default function Search() {
    const [searchType, setSearchType] = useState(0);
    const [searchValue, setSearchValue] = useState(0);
    const [stocks, setStocks] = useState([])
    const [stocksDaily, setStocksDaily] = useState()
    const [currencies, setCurrencies] = useState({})
    const [news, setNews] = useState([])

    useEffect(() => {
        updateCurrencies()
    }, [])

    const updateCurrencies = async() => {
        setCurrencies(await getCurrencies())
        setNews(await getNews())
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();

        let val = [];
        if(searchType === 1){
            val = await searchDaily(searchValue)
            setStocksDaily(val['Time Series (Daily)']);
        }else{
            val = await searchCompany(searchValue)
            setStocks(val);
        }
        
    }

    const reserValues = () => {
        setStocks([]); 
        setStocksDaily(undefined); 
    }


    return (
        <div className="main-search">
        <div className="search">
            <div className="search-head-top">
                
                <div className="search-head">
                    <h2>Escolha entre pesquisar nome de empresas ou pelo simbolo especifico</h2>
                    <div className="search-type">
                        <div className="search-type-button">
                            <input  type='radio' checked={searchType === 0} value={'Empresa'} id='Empresa' onChange={(e) => {reserValues();setSearchType(0)} }/> 
                            <label htmlFor="Empresa">Empresa</label>
                        </div>
                        <div className="search-type-button">
                            <input  type='radio'checked={searchType === 1} onChange={(e) => {reserValues();setSearchType(1)} }/> 
                            <label htmlFor="">Simbolo</label>
                        </div>
                    </div>
                    <input placeholder='IBM' onChange={(e) => handleChange(e)}/>
                    <button onClick={handleSearch}>Procurar</button>
                </div>


                
            </div>
            {/* < StockChart  data={stockinfo['Monthly Time Series']} /> */}
        </div>
        <div className="stocks-result">
                    {
                        searchType === 0  ? (
                            stocks.length > 0 ? (
                                <div className='search-result-company'>
                                    {stocks.map((s, idx) => (
                                            <Symbol 
                                                key={`${s.symbol}${idx}`}
                                                symbol={s.symbol}
                                                desc={s.description}
                                                displaySymbol={s.displaySymbol}
                                                type={s.type}
                                            />
                                    ))}
                                </div>
                            ) : <></>
  
                        ):(
                            stocksDaily !== undefined ? 
                            (
                                <div className='search-result-symbol'>
                                    <StockSearch
                                        symbol={searchValue}
                                        open={stocksDaily[Object.keys(stocksDaily)[0]]['1. open']}
                                        high={stocksDaily[Object.keys(stocksDaily)[0]]['2. high']}
                                        low={stocksDaily[Object.keys(stocksDaily)[0]]['3. low']}
                                        close={stocksDaily[Object.keys(stocksDaily)[0]]['4. close']}
                                        buy={true}
                                    />
                                    <StockChart  data={stocksDaily} />
                                </div>

                            ) : <></>
                        )
                }
            </div>
            <div className="currencies">
                {
                    Object.keys(currencies).length > 0 ? 
                    <div className="currencies-track">
                        {
                            Object.keys(currencies).map((key, idx) => (
                                <div className="currency" key={`${idx}`}>
                                    <p className='currency-name'>
                                        {currencies[key].code} &ensp;
                                    </p>
                                    <p>
                                        R${parseFloat(currencies[key].bid).toFixed(4)} &ensp;
                                    </p>
                                    <p className={parseFloat(currencies[key].pctChange) > 0 ? 'positive' : 'negative'}>
                                        {parseFloat(currencies[key].pctChange).toFixed(2)}%
                                    </p>

                                </div>
                            ))
                        }
                        {
                            Object.keys(currencies).map((key, idx) => (
                                <div className="currency" key={`${idx}`}>
                                    <p className='currency-name'>
                                        {currencies[key].code} &ensp;
                                    </p>
                                    <p>
                                        R${parseFloat(currencies[key].bid).toFixed(4)} &ensp;
                                    </p>
                                    <p className={parseFloat(currencies[key].pctChange) > 0 ? 'positive' : 'negative'}>
                                        {parseFloat(currencies[key].pctChange).toFixed(2)}%
                                    </p>

                                </div>
                            ))
                        }
                    </div>
                        :
                    null
                }
            </div>
        <div className="news">

            {
                news.length > 0 ?
                news.map((n, idx) => (
                        <a href={n.url} className={idx === 0 ? "news-link-main" : "news-link"} key={n.id}>
                            <div className={`news-div${idx === 0 ? '-first' : ''}`}>
                                <img src={n.image} alt="" className={`news-img${idx === 0 ? '-first' : ''}`} />
                                <div className={`news-info${idx === 0 ? '-first' : ''}`}>
                                    <div className={`news-main-info${idx === 0 ? '-first' : ''}`}>
                                        <h4 className="news-title">{n.headline}</h4>
                                        <p className="news-summary">&ensp;&ensp;{n.summary}</p>
                                    </div>
                                    <div className={`news-extra-info${idx === 0 ? '-first' : ''}`}>
                                        <p className={`news-source${idx === 0 ? '-first' : ''}`}>FONTE: {n.source}</p>
                                        <p className={`news-date${idx === 0 ? '-first' : ''}`}>{new Date(n.datetime * 1000).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                )):null
            }
            
        </div>
        </div>
    )
}
