import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Rating } from '@mui/material';
import FavoriteButton from './FavoriteButton';
import { getFirestore } from "firebase/firestore";
import app from "./../config/firebaseConfig";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import UserContext from "./../context/UserContext";
import ModalLoginFavorite from './ModalLoginFavorite';
import ModalLoginRating from './ModalLoginRating';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ActionAreaCard({id, title, description, releaseDate, platform, image, altText, genre, publisher}) {
  const [expanded, setExpanded] = React.useState(false);

  const db = getFirestore(app);

  const userContext = React.useContext(UserContext);

  const updateGameFavorite = async (isFavorite) => {
    userContext.updateGameFavorite(id, isFavorite)
  }

  const updateGameRating = async (e, rating) => {
    userContext.updateGameRating(id, rating)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          sx={{height: 250}}
          image={image}
          alt={altText}
        />
        <CardContent sx={{height: 150}}>
          <Typography className='game-title' gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          
        </CardContent>
        <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userContext.user ? <FavoriteButton onChange={updateGameFavorite} value={userContext.isGameFavorite(id)}/> : <ModalLoginFavorite/>}
          
          <Box sx={{ marginLeft: '8px' }}>
            {userContext.user ? <Rating max={4} onChange={updateGameRating} defaultValue={userContext.ratings[id]}/> : <ModalLoginRating/>}
            
          </Box>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" color="text.secondary">
            Genre: {genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher: {publisher}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Platform: {platform}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {releaseDate}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

