import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PageOver({ open, onClose, item }) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {item?.volumeInfo?.title || 'Detalhes do Livro'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom variant="h6">
          Detalhes do Livro
        </Typography>
        <Box>
          <Typography gutterBottom variant="body2">
            Título: {item?.volumeInfo?.title || 'Título desconhecido'}
          </Typography>
          {item?.volumeInfo?.imageLinks?.thumbnail && (
            <img
              alt="Capa do livro"
              src={item.volumeInfo.imageLinks.thumbnail}
              width="150"
              style={{ marginBottom: '10px' }}
            />
          )}
          <Typography>
            Avaliação: {item?.volumeInfo?.averageRating || 'Sem avaliações'}
            <StarIcon />
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ display: 'block', color: 'textPrimary', marginTop: '10px' }}
        >
          {item?.volumeInfo?.description || 'Descrição não disponível.'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

PageOver.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired, 
}

export default PageOver;
