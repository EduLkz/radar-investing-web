import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateUserStocksInfo, updateWalletInfo } from '../../api/api';
import { updateStocks, updateWallet } from '../features/User/userSlice';

export const useUpdateUserInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateLoggedUserInfo = async (loggedEmail) => {
        try {
            const wallet = await updateWalletInfo(loggedEmail);
            
            const updatedWallet = {
                balance: wallet[0],
                performance: wallet[1],
                variation: wallet[2],
                profit: wallet[3],
                variation_details: wallet[4],
            };
            
            dispatch(updateWallet(updatedWallet));
            
            const stocks = await updateUserStocksInfo(loggedEmail, updatedWallet['variation_details']);
            dispatch(updateStocks(stocks));
        
            navigate('/Wallet');
        } catch (error) {
            console.log("Erro ao atualizar informações do usuário:", error);
        }
    };

    return updateLoggedUserInfo;
};