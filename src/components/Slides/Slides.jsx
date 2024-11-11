import Setting from './Setting';
import PageOver from '../PageOver';
import styles from '../../styles/Home.module.css';
import LogoBook from '../../assets/semLogo.jpg'

import { Typography, Skeleton, Box } from '@mui/material';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

function Slides({ dado, isFetching }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Armazena o item selecionado
    const { settings } = Setting();

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Slider {...settings}>
                {(isFetching ? Array.from(new Array(dado.length)) : dado).map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '19%',
                            minWidth: 210,
                            height: 350,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {isFetching || (!item) ? (
                            <Skeleton variant="rectangular" width={210} height={280} />
                        ) : (
                            <img
                                className={styles.imgBooks}
                                alt={item.volumeInfo.title}
                                src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : LogoBook}
                                onClick={() => handleOpen(item.volumeInfo)} // Passa o item para o modal
                            />
                        )}
                        <Box sx={{ pr: 2, mt: 1 }}>
                            {isFetching || (!item) ? (
                                <Skeleton width="100%" />
                            ) : (
                                <>
                                    <Typography gutterBottom variant="body2">
                                        {item.volumeInfo.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ display: 'block', color: 'textPrimary' }}
                                    >
                                        {Array.isArray(item.volumeInfo.authors)
                                            ? item.volumeInfo.authors.join(', ')
                                            : item.volumeInfo.authors || 'Autor desconhecido'}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ display: 'block', color: 'text.secondary' }}
                                    >
                                        {"Gênero:" + item.volumeInfo.categories}
                                    </Typography>
                                    <Typography variant="caption" sx={{display: 'flex', justifyContent: 'center'}}>
                                        {item.volumeInfo.averageRating || "Sem avaliações"}
                                        <StarIcon size='small'/>
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                ))}
            </Slider>

            {selectedItem && (
                <PageOver open={open} onClose={handleClose} item={selectedItem} />
            )}
        </>
    );
}

Slides.propTypes = {
    dado: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Slides;
