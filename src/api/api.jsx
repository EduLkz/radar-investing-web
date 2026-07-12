import axios from "axios";

const api = axios.create({
    baseURL: window.__API_URL__ || process.env.REACT_APP_API_URL
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
        localStorage.removeItem('');
        console.log('Ocorreu um erro')
    }
}

export const verifySession = async (token) => {
    try {
        const res = await api.post('/validate-login', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        if (res.status === 200) {
            return res.data
        } 
        
    } catch (error) {
        console.log("Sessão inválida ou expirada. Efetuando logout...");
        localStorage.removeItem('');
        return []
    }
}

export const userRegisterDB = async (nome, cpf, tel, email, password) => {
    try {
        const res = await api.post('/register-user', {
            nome: nome,
            tel: tel,
            email: email,
            cpf: cpf,
            senha: password,
        })

        const data = res.data;

        return data
        
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const requestChangePassword = async (email) => {
    try {
        const res = await api.post('/request-reset-password', {
            email: email
        })

        const data = res.data;

        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}


export const userChangePassword = async (newPassword, token) => {
    try {
        const res = await api.post('/reset-password', {
            novaSenha: newPassword,
            token: token
        })

        const data = res.data;

        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const userConfirmedChangePassword = async (email, password, newPassword) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/reset-password-confirmed', {
            email: email,
            senha: password,
            novaSenha: newPassword
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const data = res.data;
        
        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const searchCompany = async (company) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/search-company', {
            value: company
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const data = res.data.result;
        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const searchDaily = async (Symbol) => {

    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/search-daily', {
            "value": Symbol
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        return res.data;
    } catch (error) {
        console.log('Ocorreu um erro')
    }    
}

export const getSymbolLast = async (Symbol) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/search-specific', {
            "value": Symbol
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        return Object.values(res.data);
    } catch (error) {
        console.log('Ocorreu um erro')
    }    
}

export const addSymbol = async (email, symbol, qnt, close) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/api/stocks/buy', {
            email: email,
            symbol: symbol,
            quantity: qnt,
            price: close
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        if(res.status !== 200 || res.status !== 201){
            throw new Error(`${res.data}, ${res.status}`);
        }
        
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const removeSymbol = async (symbol) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res = await api.post('/search-remove', {
            value: symbol
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}



export const updateWalletInfo = async (email) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const resPerf = await api.post('/api/stocks/performance', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const resVar = await api.post('/api/stocks/variation', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const resProf = await api.post('/api/stocks/total-profit', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const resBalance = await api.post('/api/balance', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
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
        console.log('Ocorreu um erro')
    }
}


export const updateUserStocksInfo = async (email, variation_details) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res= await api.post('/api/stocks', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        const userStocks = res.data['acoes']


       userStocks.forEach((stock) => {
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

        return userStocks

    } catch (error) {
        console.log('Ocorreu um erro')
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
        console.log('Ocorreu um erro')
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
        console.log('Ocorreu um erro')
    }
}


export const getMonthlyProfit = async (email) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res= await api.post('/api/stocks/chart', {
            email: email
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        const data = res.data

        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const getPreviewSaleInfo = async (email, symbol, quantity) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res= await api.post('/api/stocks/preview-sale', {
            'email': email,
            'symbol': symbol,
            'quantity': quantity
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        const data = res.data.preview

        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}

export const getMakeSaleInfo = async (email, symbol, quantity) => {
    try {
        const token = localStorage.getItem('@radarinvest:token');
        const res= await api.post('/api/stocks/make-sale', {
            'email': email,
            'symbol': symbol,
            'quantity': quantity
        },{ 
            headers: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        const data = res.data.preview

        return data
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}


export const getEmailValidation = async (email, nome) => {
    try {
        const res= await api.post('/request-confirm-email', {
            'email': email,
            'nome': nome
        })

        if(res.status !== 200){
            throw new Error(`${res.data}, ${res.status}`);
        }

        return res.status
    } catch (error) {
        console.log('Ocorreu um erro')
    }
}