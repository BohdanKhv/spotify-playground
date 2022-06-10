import { useSelector } from "react-redux"
import { Chip, Stack } from "@mui/material"
import './style.css'

const ArtistItem = ({item}) => {

    return (
        item &&
        <div className="card flex">
            <div className="card-img">
                <img src={item.images ? item?.images[0].url : ''} alt="img" />
            </div>
            <div className="card-body flex-grow"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 75%), rgb(0 0 0 / 75%)), url(${item.images ? item?.images[0].url : ''})`,
                }}
            >
                <div className="flex flex-column h-100 justify-between">
                    <div>
                        <h5 className="card-title">{item?.name}</h5>
                        <h5 className="card-secondary">{item?.followers?.total} followers</h5>
                        <h5 className="card-secondary">{item?.popularity} popularity</h5>
                    </div>
                    <div className="flex flex-wrap">
                        {item.genres && item?.genres.map((genre, index) => (
                            <Chip key={index} color="primary" style={{marginRight: '8px', marginTop: '8px'}} label={genre} size="small" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistItem