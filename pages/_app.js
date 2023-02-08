import '../styles/globals.css'
import { Lexend } from '@next/font/google'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
})

export default function App({ Component, pageProps }) {
  return(
    <ThemeProvider enableSystem={true} attribute="class">
      <main className={`${lexend.variable} font-sans`}>
        <Layout>
          <div className="mb-10 flex flex-col justify-center items-center">
            <Component {...pageProps} />
          </div>
        </Layout>
      </main>
    </ThemeProvider>
  )
}
