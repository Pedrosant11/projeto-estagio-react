import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#06101f',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function ModalLoginFavorite() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <FavoriteBorderIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReportProblemIcon sx={{ fontSize: 30, color: '#9E0303' }}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
            Attention
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="white">
            You need to be logged in to perform this action.
          </Typography>
          <Button
            component={Link}
            to="/auth/login"
            variant="contained"
            sx={{ 
                mt: 2, 
                background: 'none',
                border: '2px solid #17d12f',
                borderRadius: '25px',
                color: '#fff',
                cursor: 'pointer',
                height: '50px',
                width: '150px',
                fontSize: '15px',
                '&:hover': {
                    backgroundColor: '#17d12f', 
                    color: '#000', 
                  },
             }} 
          >
            Login
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
