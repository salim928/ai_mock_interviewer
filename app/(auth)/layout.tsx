import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: {children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  console.log('User Authenticated:', isUserAuthenticated);

  if (isUserAuthenticated) {
      console.log('Redirecting to home page...');
      redirect('/');
  } else {
      console.log('User not authenticated, staying on auth page.');
  }
  return (
    <div className="auth-layout">{children} </div>
  )
}

export default AuthLayout
