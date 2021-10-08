import '../styles/globals.css'
import AuthLayout from '../common/components/layouts/AuthLayout'

function MyApp({ Component, pageProps }) {
  return (
  <AuthLayout>

     <Component {...pageProps} />
  </AuthLayout>
  )
}

export default MyApp
