import styles from "../styles/Dashboard.module.css"
import { Container, Box, Typography, Divider } from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InterativeTimeRating from '../components/Graficos/InterativeTimeRating';
// import InterativeSubject from '../components/Graficos/InterativeSubject';
function Dashboard() {
    return (
        <Container size='large' sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Container size='medium'>
                <Typography variant='h2'>
                    Dashboards
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
                    <Typography variant='h6'>Principais Informações</Typography>
                    <AnalyticsIcon size='large' />
                </Box>
               
                <Container sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: '2%' }}>
                    <Divider />
                    <Box size='small' sx={{marginBottom: '3%'}}><Typography variante='body2'>Aqui você confere as principais informações gráficas sobre o mundo da literatura</Typography></Box>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/** Fazer as análises gráficas */}
                        <InterativeTimeRating /> 
                        <InterativeTimeRating />
                        {/* // <InterativeSubject/> */}
                    </Container>
                </Container>

            </Container>
        </Container>
    )
}

export default Dashboard;