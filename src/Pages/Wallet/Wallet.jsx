import React from 'react'
import Stocks from '../../Components/Stocks/Stocks'
import './Wallet.css'

export default function Wallet() {
  return (
    <div className='wallet'>
      <div className="wallet-stocks">

          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={244.71} low={244.71} close={247.67} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={276.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />
          <Stocks symbol='IBM' open={247.67} high={249.72} low={244.71} close={246.28} />

      </div>
    </div>
  )
}
