import Setting from './Setting'
import styles from '../../styles/Home.module.css';
import { Typography, Skeleton, Box } from '@mui/material';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
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
                            src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null}
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
                                    sx={{ display: 'block', color: 'textPrimary' }}
                                >
                                    {Array.isArray(item.volumeInfo.authors)
                                        ? item.volumeInfo.authors.join(', ')
                                        : item.volumeInfo.authors || 'Autor desconhecido'}
                                </Typography>
                                <Typography
                                    variant="h1"
                                    sx={{ display: 'block', color: 'text.secondary' }}
                                >
                                    {item.volumeInfo.categories}
                                </Typography>
                                <Typography>
                                    {item.volumeInfo.averageRating}
                                    <StarIcon />
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