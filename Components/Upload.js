import React from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {
  return (
    <div>
    <Button variant="outlined" fullWidth component="label" startIcon = {<MovieIcon/>} style ={{marginTop : "0.5rem"}}><input style ={{display : "none"}} type="file" accept="audio/*,video/*,image/*" ></input>upload</Button>
    <LinearProgress variant="determinate" value={10} />
</div>
    
  )
}

export default Upload