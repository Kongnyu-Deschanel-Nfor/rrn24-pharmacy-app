import React from 'react'
import { LoginFormFinder } from '../../components/ui/register/login-form-finder';

export default function RegisterFinder() {
  return (
     <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <LoginFormFinder />
          </div>
        </div>
  )
}
