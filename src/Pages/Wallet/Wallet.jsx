import FeatherIcon from 'feather-icons-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import StockChart from '../../Components/JsonLineChart'
import StockSell from '../../Components/ModalWindows/StockSell/StockSell'
import Stocks from '../../Components/Stocks/Stocks'
import { getMonthlyProfit } from '../../api/api'
import './Wallet.css'

export default function Wallet() {
  
  const userWallet = useSelector((state) => state.user.wallet)
  const userStocks = useSelector((state) => state.user.stocks)
  const user = useSelector((state) => state.user)

  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line
  const [symbolInfo, setSymbolInfo] = useState(null); 
  const [searchType, setSearchType] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState([]);
    
  useEffect(() => {
    loadBalance()
    // eslint-disable-next-line
  }, [])

  

  const loadBalance = async() => {
    setMonthlyProfit(await getMonthlyProfit(user.info.email))
    
  }

  return (
    <div className='wallet'>
      <div className="wallet-info">
        <div className="balance info-values">
          <p>Patrimônio</p>
          <div style={{display:'flex', justifyContent: 'center', alignItems:'center', margin: 0}}>
            <p className={userWallet.balance > 0 ? 'positive' : 'negative'}>R${userWallet.balance}</p>
            {
              userWallet.balance > 0 ?
              <FeatherIcon icon='arrow-up-right' stroke='green'/>
              :
              <FeatherIcon icon='arrow-down-right' stroke='red'/>
            }
          </div>
        </div>
        <div className="performance info-values">
          <p>Rentabilidade</p>
          <div style={{display:'flex', justifyContent: 'center', alignItems:'center', margin: 0}}>
            <p className={userWallet.performance > 0 ? 'positive' : 'negative'}>{userWallet.performance}</p>
            {
              userWallet.performance > 0 ?
              <FeatherIcon icon='arrow-up-right' stroke='green'/>
              :
              <FeatherIcon icon='arrow-down-right' stroke='red'/>
            }
          </div>
        </div>
        <div className="variation info-values">
          <p>Variação</p>
          <div style={{display:'flex', justifyContent: 'center', alignItems:'center', margin: 0}}>
            <p className={userWallet.variation > 0 ? 'positive' : 'negative'}>{userWallet.variation}</p>
            {
              userWallet.variation > 0 ?
              <FeatherIcon icon='arrow-up-right' stroke='green'/>
              :
              <FeatherIcon icon='arrow-down-right' stroke='red'/>
            }
          </div>
        </div>
        <div className="profit info-values">
          <p>Lucro Total</p>
          <div style={{display:'flex', justifyContent: 'center', alignItems:'center', margin: 0}}>
            <p className={userWallet.profit > 0 ? 'positive' : 'negative'}>R${userWallet.profit}</p>
            {
              userWallet.profit > 0 ?
              <FeatherIcon icon='arrow-up-right' stroke='green'/>
              :
              <FeatherIcon icon='arrow-down-right' stroke='red'/>
            }
          </div>
        </div>
      </div>
      <div className="monthly-profit">
        <h3>Lucro Mensal</h3>
        {
          monthlyProfit.length > 0 ? (<StockChart data={monthlyProfit} />) : (<h4>Sem registros</h4>)
        }
      </div>

      <div className='wallet-options-head'>
        <div className="wallet-options">
          <div className="wallet-options-button">
              <input  type='radio' checked={searchType === 0} value={'Vender'} id='Empresa' onChange={(e) => {setSearchType(0)} }/> 
              <label htmlFor="Vender">Vender</label>
          </div>
          <div className="wallet-options-button">
              <input  type='radio'checked={searchType === 1} value={'Comprar'} id='Comprar'  onChange={(e) => {setSearchType(1)} }/> 
              <label htmlFor="Comprar">Comprar</label>
          </div>
        </div>
      </div>




      <h3 style={{marginBottom:0}}>Meus Ativos</h3>
      <div className="wallet-stocks">
        {
          userStocks.length > 0 ? (<>
              {userStocks.map((stock, idx) => (
                <Stocks
                  key={`${stock.symbol}${idx}`}
                  symbol={stock.symbol}
                  qnt={stock.qnt}
                  valueAvg={stock.value}
                  currentValue={stock.current_price}
                  variation={stock.variation}
                  performance={stock.performance}
                  profit={stock.profit}
                />
              ))}
            </>
          ): <></>
        }
        

      </div>
      <StockSell
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
            stockData={symbolInfo}
        />
    </div>
  )
}
