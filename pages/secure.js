import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Secure() {
  const { data, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(status);
    if (status === 'unauthenticated') {
      router.push('/auth/SignIn')
    }
  }, [data])
  return (
    status === 'authenticated' ? <div>
      <div>This is Secure Page...</div>
      <div className='mb-2'>You are login with:-- {data?.user?.email}</div>
      <Button variant='primary' className='ml-2' onClick={() => signOut({
        callbackUrl: '/'
      })}>Log Out</Button>
    </div> : <div>Loading...</div>
  )
}
