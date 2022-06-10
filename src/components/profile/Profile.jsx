import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/user/userSlice";
import { getTop, reset } from "../../features/item/itemSlice";
import { CircularProgress } from "@mui/material"
import { TabsBar, SongItem, ArtistItem } from '../';


const Profile = () => {
    const dispatch = useDispatch();
    const { items, isLoading, hasMore } = useSelector(state => state.item);
    const [tab, setTab] = useState(0);
    const { profile } = useSelector(state => state.user);

    useEffect(() => {
        if(!profile) {
            dispatch(getProfile());
        }
    }, [])

    const getData = () => {
        if (tab === 0) {
            return dispatch(getTop('artists'));
        } else if (tab === 1) {
            return dispatch(getTop('tracks'));
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
    }, [tab]);

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
                {tab === 0 ? 
                items && items.map((item, index) => {
                    if(items.length === index + 1) {
                        return <div ref={lastElementRef} key={index}><ArtistItem item={item}/></div>
                    } else {
                        return <ArtistItem key={index} item={item}/>
                    }
                })
                : tab === 1 ?
                items && items.map((item, index) => {
                    if(items.length === index + 1) {
                        return <div ref={lastElementRef} key={index}><SongItem item={item}/></div>
                    } else {
                        return <SongItem key={index} item={item}/>
                    }
                })
                : null}
                {isLoading &&
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
                }
            </div>
        </section>
    )
}

export default Profile