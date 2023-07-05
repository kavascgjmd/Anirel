import '../styles/globals.css'
import './signup.css'
import './login.css'
import '../Components/Feed.css'
import AuthWrapper from '../context/auth'
import { fontStyle } from '@mui/system'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  
  return (
  <AuthWrapper>
    <Head>
    <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Press+Start+2P&display=swap" rel="stylesheet"/>
   
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/> 
    </Head>
    <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
