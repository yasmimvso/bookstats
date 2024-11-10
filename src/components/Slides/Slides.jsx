import Setting from './Setting'
import styles from '../../styles/Home.module.css';
import { Typography, Skeleton, Box } from '@mui/material';
import Slider from "react-slick";
import PropTypes from 'prop-types';

function Slides({dado, isFetching}){
    
    const { settings } = Setting();

    return(
        <Slider {...settings}>
            {(isFetching ? Array.from(new Array(dado.length)) : dado).map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '19%',
                        minWidth: 210,
                        height: 340,
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
                            src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null}
                            onClick={() => { console.log("Adicionar função para mostrar mais informações") }}
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
                                    sx={{ display: 'block', color: 'text.secondary' }}
                                >
                                    {Array.isArray(item.volumeInfo.authors)
                                        ? item.volumeInfo.authors.join(', ')
                                        : item.volumeInfo.authors || 'Autor desconhecido'}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Box>
            ))}
        </Slider>
    )

}

Slides.propTypes = {
    dado: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};


export default Slides;