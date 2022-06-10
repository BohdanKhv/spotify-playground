import { useState, useRef } from "react";
import { useSelector } from "react-redux"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircle from '@mui/icons-material/PauseCircle';
import { IconButton } from "@mui/material";
import './style.css'

const SongItem = ({item}) => {
    const audio = useRef();
    const [play, setPlay] = useState(false);

    return (
        <>
            <div className="card flex">
                <div className="card-img">
                    <img src={item?.album?.images[0].url} alt="img" />
                </div>
                <div className="card-body flex-grow"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 75%), rgb(0 0 0 / 75%)), url(${item?.album?.images[0].url})`,
                    }}
                >
                    <div className="flex flex-column h-100 justify-between">
                        <div>
                            <h5 className="card-title">{item?.name}</h5>
                            <h5 className="card-secondary">{item?.artists?.length > 0 && item?.artists[0].name}</h5>
                        </div>
                        <div className="flex justify-between align-center">
                            <div className="title-2 text-secondary">
                                {item?.duration_ms && `${Math.floor(item?.duration_ms / 60000)}:${Math.floor((item?.duration_ms % 60000) / 1000) < 10 ? '0' : ''}${Math.floor((item?.duration_ms % 60000) / 1000)}`}
                            </div>
                            <IconButton 
                                color="primary"
                                size="large"
                                aria-label="play/pause"
                                onClick={() => {
                                    if (play) {
                                        audio.current.pause();
                                        setPlay(false);
                                    }
                                    else {
                                        audio.current.play();
                                        setPlay(true);
                                    }
                                }}
                            >
                                {play ? <PauseCircle sx={{fontSize: '80px'}} /> : <PlayArrowIcon sx={{fontSize: '80px'}} />}
                            </IconButton>
                        </div>
                        <audio controls ref={audio}>
                            <source src={item.preview_url} type="audio/mpeg" />
                        </audio>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SongItem