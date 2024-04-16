import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Secure() {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/SignIn");
    }
  });
  return (
    <div>
      <div>This is Secure Page...</div>
      <div className='mb-2'>You are login with:-- {data?.user?.email}</div>
      <Button variant='primary' className='ml-2' onClick={() => signOut({
        callbackUrl: '/'
      })}>Log Out</Button>
    </div>
  )
}