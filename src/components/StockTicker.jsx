import React, { useState, useEffect } from 'react';

function StockTicker() {
  const [stocks, setStocks] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const API_KEY = 'ctem071r01qt478map80ctem071r01qt478map8g'
  
  // Extended list of stock symbols
  const allStockSymbols = [
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA',
    'META', 'NFLX', 'NVDA', 'JPM', 'BAC',
    'DIS', 'PYPL', 'INTC', 'CSCO', 'AMD'
  ];

  const fetchStockData = async (symbols) => {
    try {
      const stockPromises = symbols.map(async (symbol) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );
        const data = await response.json();
        
        return {
          symbol,
          price: data.c.toFixed(2),
          change: (data.c - data.pc).toFixed(2),
          percentChange: ((data.c - data.pc) / data.pc * 100).toFixed(2)
        };
      });

      const stockData = await Promise.all(stockPromises);
      setStocks(stockData);
    } catch (error) {
      console.log('Refreshing stock data...');
    }
  };

  useEffect(() => {
    // Initial fetch
    const initialSymbols = allStockSymbols.slice(0, 5);
    fetchStockData(initialSymbols);

    // Rotate stocks every 10 seconds
    const rotateInterval = setInterval(() => {
      setDisplayIndex((prevIndex) => {
        const nextIndex = (prevIndex + 5) % allStockSymbols.length;
        const nextSymbols = allStockSymbols.slice(nextIndex, nextIndex + 5);
        fetchStockData(nextSymbols);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(rotateInterval);
  }, []);

  return (
    <div className="stocks-dashboard">
      <div className="stocks-ticker">
        {stocks.map(stock => (
          <div key={stock.symbol} className="stock-item">
            <span className="stock-symbol">{stock.symbol}</span>
            <span className="stock-price">${stock.price}</span>
            <span className={`stock-change ${parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}`}>
              {parseFloat(stock.change) >= 0 ? '↑' : '↓'} {Math.abs(stock.change)}
              ({stock.percentChange}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTicker;
