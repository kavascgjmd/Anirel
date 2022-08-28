import '../styles/globals.css'
import './signup.css'
import './login.css'
import '../Components/Feed.css'
import AuthWrapper from '../context/auth'
function MyApp({ Component, pageProps }) {
  
  return (
  <AuthWrapper>
    <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
