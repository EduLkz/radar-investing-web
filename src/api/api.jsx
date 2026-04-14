import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

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
    try {
        api.post('/search-specific', {
            value: Symbol
        }).then((res) => {
            const data = res.data;
            console.log(data)
        })
        
    } catch (error) {
        console.log(error)
    }    
}

export const addSymbol = async (symbol) => {
    try {
        const res = await api.post('/search-add', {
            value: symbol
        })
        if(res.status != 200){
            throw 'erro'
        }
        console.log(res.data)
        
    } catch (error) {
        console.log(error)
    }
}

export const removeSymbol = async (symbol) => {
    try {
        const res = await api.post('/search-remove', {
            value: symbol
        })
        if(res.status != 200){
            throw 'erro'
        }
        console.log(res.data)
        
    } catch (error) {
        console.log(error)
    }
}


export const getUserSymbols = async () => {
    try {
        const res = await api.get('/get-user-symbols')
        if(res.status != 200){
            throw 'erro'
        }
        console.log(res.data)
        
    } catch (error) {
        console.log(error)
    }
}