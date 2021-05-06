import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import useAxiosGet from '../../hooks/useAxiosGet';
import Box from '@material-ui/core/Box';
import Spinner from '../Shared/Spinner';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import NewProductModal from './NewProductModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalBody: {
      [theme.breakpoints.down('sm')]: {
        width: '75%',
      },
      [theme.breakpoints.up('md')]: {
        width: '70%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '50%',
      },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius
    }
  }),
);

const ProductList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const {data, loading, refetch} = useAxiosGet({endpoint: 'api/products/'});
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box padding={4}>
        <Grid container>
          {loading ? <Spinner /> : data.map((product:any) => <ProductCard product={product} />)}
        </Grid>
      </Box>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <NewProductModal handleClose={handleClose} classes={classes} refetchProducts={refetch} />
        </Fade>
      </Modal>
    </>
  )
};

export default ProductList;