import { useSelector } from 'react-redux';
import { Login, Profile } from '../components';

const Home = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="container mt">
            {user ? 
                <Profile/>
            :
                <Login />
            }
        </div>
    )
}

export default Home