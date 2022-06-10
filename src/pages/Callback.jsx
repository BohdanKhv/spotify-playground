import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const Callback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if(hash.startsWith('#access_token=')) {
            console.log('hash', hash);
            const accessToken = hash.split('=')[1].replace('&token_type', '');
            const expiresIn = hash.split('expires_in=')[1]
            const user = {
                accessToken,
                expiresIn,
            }
            dispatch(setUser(user));
            navigate('/');
        } else {
            navigate('/');
        }
    }, [])

    return null
}

export default Callback