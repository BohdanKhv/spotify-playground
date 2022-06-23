import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/user/userSlice";
import { getTop, playlist, reset } from "../../features/item/itemSlice";
import { CircularProgress, InputLabel, Select, MenuItem, FormControl } from "@mui/material"
import { TabsBar, SongItem, ArtistItem } from '../';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, isLoading, hasMore } = useSelector(state => state.item);
    const [tab, setTab] = useState(0);
    const { profile, user } = useSelector(state => state.user);
    const [timeRange, setTimeRange] = useState('medium_term');

    useEffect(() => {
        // Check if expires_in is already expired
        if (user.expiresIn && user.loginTime && ((+user.expiresIn * 1000) + user.loginTime) < Date.now()) {
            console.log("Token expired");
            localStorage.removeItem('user');
            localStorage.removeItem('profile');
            navigate('/');
        } else {
            console.log('Token will expire in', ((Date.now() - ((+user.expiresIn * 1000) + user.loginTime))/1000) / 60, 'minutes');
        }

        if(!profile) {
            dispatch(getProfile());
        }
    }, [])

    const getData = () => {
        if (tab === 0) {
            return dispatch(getTop({type: 'artists', timeRange: timeRange}));
        } else if (tab === 1) {
            return dispatch(getTop({type: 'tracks', timeRange: timeRange}));
        } else if (tab === 2) {
            return dispatch(playlist());
        }
    }

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                const promise = getData();

                return () => {
                    promise && promise.abort();
                    dispatch(reset());
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    useEffect(() => {
        const promise = getData();

        return () => {
            console.log('dispatch reset');
            promise && promise.abort();
            dispatch(reset());
        }
    }, [tab, timeRange]);

    return (
        profile &&
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
            <TabsBar
                value={tab}
                setValue={setTab}
            />
            <div className="mt">
                <div className="flex flex-end">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Time Range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={timeRange}
                            label="Time Range"
                            onChange={(e) => {
                                setTimeRange(e.target.value);
                            }}
                        >
                            <MenuItem value={'short_term'}>Short (~4 weeks)</MenuItem>
                            <MenuItem value={'medium_term'}>Medium (~6 month)</MenuItem>
                            <MenuItem value={'long_term'}>Long (~years)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {tab === 0 ? 
                items && items.map((item, index) => {
                    if(items.length === index + 1) {
                        return <div ref={lastElementRef} key={index}><ArtistItem item={item}/></div>
                    } else {
                        return <ArtistItem key={index} item={item}/>
                    }
                })
                : tab === 1 || tab === 2 ?
                items && items.map((item, index) => {
                    if(items.length === index + 1) {
                        return <div ref={lastElementRef} key={index}><SongItem item={item}/></div>
                    } else {
                        return <SongItem key={index} item={item}/>
                    }
                })
                : null}
                {isLoading &&
                <div className="flex justify-center mt">
                    <CircularProgress />
                </div>
                }
            </div>
        </section>
    )
}

export default Profile