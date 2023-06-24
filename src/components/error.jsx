import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';

export default function ErrorMensage({mensage}) {
    return (
        <div className="error-container">
            <ReportProblemIcon sx={{ fontSize: 100, color: '#9E0303' }}/>
            <Typography variant='h4'>
                
                {mensage}
            
            </Typography>
        </div>
    )
}