import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router=useRouter()

  useEffect(()=>{
    router.push('/auth/SignIn')
  },[])
  return (
    <h2>Loading....</h2>
  )
}
