import '../styles/globals.css'
import './signup.css'
import './login.css'
import '../Components/Feed.css'
import AuthWrapper from '../context/auth'
import { fontStyle } from '@mui/system'



function MyApp({ Component, pageProps }) {
  
  return (
  <AuthWrapper>
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Press+Start+2P&display=swap" rel="stylesheet"/>
   
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/> 
    </head>
    <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
