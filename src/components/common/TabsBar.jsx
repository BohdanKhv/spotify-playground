import { useState } from "react";
import { Tabs, Tab, Box  } from "@mui/material";

const TabsBar = ({value, setValue}) => {

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };
    
    return (
        <div className="mt">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Top Artists" />
                    <Tab label="Top Tracks" />
                    <Tab label="Playlist" />
                </Tabs>
            </Box>
        </div>
    )
}

export default TabsBar