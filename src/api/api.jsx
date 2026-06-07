import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

export const userLoginDB = async (email, password) => {
    try {
        const res = await api.post('/login-user', {
            email: email,
            password: password,
        })

        const token = res.data.token;

        const resValidation = await api.post('/validate-login', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        localStorage.setItem('@radarinvest:token', token);
        const data = resValidation.data;
        return data
        
    } catch (error) {
        console.log(error)
    }
}

export const verifySession = async (token) => {
    try {
        const res = await api.post('/validate-login', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        console.log(res)

        if (res.status === 200) {
            return res.data
        } 
        
    } catch (error) {
        console.log("Sessão inválida ou expirada. Efetuando logout...");
        localStorage.removeItem('@radarinvest:token');
        return []
    }
}

export const searchCompany = async (company) => {
    try {
        const res = await api.post('/search-company', {
            value: company
        })

        const data = res.data.result;
        return data
        
    } catch (error) {
        console.log(error)
    }
}

export const searchDaily = async (Symbol) => {
    // console.log(stockinfo)
    // return stockinfo
    try {
        const res = await api.post('/search-daily', {
            "value": Symbol
        });

        return res.data;

        // api.post('/search-daily', {
        //     "value": Symbol
        // }).then((res) => {
        //     const data = res.data;
        //     console.log(data)
        //     return data
        // })
        
    } catch (error) {
        console.log(error)
    }    
}

export const getSymbolLast = async (Symbol) => {
    // console.log(stockinfo)
    // return stockinfo
    try {
        const res = await api.post('/search-specific', {
            "value": Symbol
        });

        return Object.values(res.data);

        // api.post('/search-daily', {
        //     "value": Symbol
        // }).then((res) => {
        //     const data = res.data;
        //     console.log(data)
        //     return data
        // })
        
    } catch (error) {
        console.log(error)
    }    
}

export const addSymbol = async (email, symbol, qnt, close) => {
    try {
        const res = await api.post('/api/stocks/buy', {
            email: email,
            symbol: symbol,
            quantity: qnt,
            price: close
        })
        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const removeSymbol = async (symbol) => {
    try {
        const res = await api.post('/search-remove', {
            value: symbol
        })
        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }
        
    } catch (error) {
        console.log(error)
    }
}



export const updateWalletInfo = async (email) => {
    try {
        const resPerf = await api.post('/api/stocks/performance', {
            email: email
        })

        const resVar = await api.post('/api/stocks/variation', {
            email: email
        })

        const resProf = await api.post('/api/stocks/total-profit', {
            email: email
        })

        const resBalance = await api.post('/api/balance', {
            email: email
        })
        
        const wallet = [
            resBalance.data['balance'],
            resPerf.data['performance'],
            resVar.data['variation_details'][0]['percentual_variation'],
            resProf.data['profit'],
            resVar.data['variation_details']
        ]
        return wallet

    } catch (error) {
        console.log(error)
    }
}


export const updateUserStocksInfo = async (email, variation_details) => {
    try {
        const res= await api.post('/api/stocks', {
            email: email
        })

        const userStocks = res.data['acoes']


       userStocks.forEach((stock) => {
            // Utiliza o .find() pois variation_details é um Array
            const detalhes = variation_details.find(item => item.symbol === stock.symbol);
            
            const precoCompra = stock.value;
            const quantidade = stock.qnt;

            if (detalhes && precoCompra) {
                const precoAtual = detalhes.current_price;

                const variacaoAbsoluta = precoAtual - precoCompra;
                const rentabilidade = ((precoAtual / precoCompra) - 1) * 100;

                stock.current_price = precoAtual;
                stock.variation = parseFloat(variacaoAbsoluta.toFixed(2));
                stock.performance = parseFloat(rentabilidade.toFixed(2));
                
                if (quantidade) {
                    stock.profit = parseFloat((variacaoAbsoluta * quantidade).toFixed(2));
                }

            } else {
                console.log(`[-] Sem dados de mercado para atualizar: ${stock.symbol}`);
            }
        })

        console.log(userStocks)

        return userStocks

    } catch (error) {
        console.log(error)
    }
}



export const getCurrencies = async () => {
    try {
        const res = await api.get('/world-currency')
        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        return res.data
        
    } catch (error) {
        console.log(error)
    }
}


export const getNews = async () => {
    try {
        const res = await api.get('/market-news')
        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        const data = res.data
        data.length = 10
        return data
        
    } catch (error) {
        console.log(error)
    }
}


export const getMonthlyProfit = async (email) => {
    try {
        const res= await api.post('/api/stocks/chart', {
            email: email
        })
        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        const data = res.data

        return data
        
    } catch (error) {
        console.log(error)
    }
}