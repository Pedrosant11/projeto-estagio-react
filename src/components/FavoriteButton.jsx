import React, { useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavoriteButton({onChange, value}) {
    const [favorite, setFavorite] = React.useState(value ?? false)

    const handleButtonClick = () => {
        onChange(!favorite)
        setFavorite(!favorite)
    }

    return (
        <>
        {favorite ? <FavoriteIcon htmlColor='red' onClick={handleButtonClick}/> : <FavoriteBorderIcon onClick={handleButtonClick}/>}
        </>
    )
}