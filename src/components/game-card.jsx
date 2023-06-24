import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({title, description, releaseDate, platform, image, altText, genre, publisher}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={image}
          alt={altText}
        />
        <CardContent>
          <Typography className='game-title' gutterBottom variant="h5" component="div">
            {title}
          </Typography>
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
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

