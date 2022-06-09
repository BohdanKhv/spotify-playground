import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/user/userSlice";
import './styles/profile.css';


const Profile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);

    useEffect(() => {
        if(!profile) {
            dispatch(getProfile());
        }
    }, [])

    return (
        <section>
            <div className="flex">
                <div className="avatar mr-1">
                    <img src={profile.images[0].url} alt="avatar" />
                </div>
                <div className="info flex-grow">
                    <a 
                        href={profile.external_urls.spotify}
                        className="text-hover px-3 title-1"
                        target="_blank"
                    >
                        {profile.display_name}
                    </a>
                    <p className="text-secondary px-3 title-3">{profile.email}</p>
                    <div className="flex mt-1">
                        <div className="title-4 px-3">
                            {profile.followers.total} followers
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile