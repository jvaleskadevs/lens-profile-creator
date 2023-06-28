'use client'
import { useState } from 'react'
import { useWalletLogin, isValidHandle, useCreateProfile } from '@lens-protocol/react-web'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function LensProfileCreator() {
  const [handle, setHandle] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin()
  const { execute: create, error: createError, isPending: isCreatePending } = useCreateProfile()

  const { isConnected, address } = useAccount()
  const { disconnectAsync } = useDisconnect()

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  })

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient()
      await login({
        address: walletClient.account.address,
      })
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!handle) return
    if (isValidHandle(handle)) {
      try {
        const result = await create({ handle })
        
        if (result.isSuccess()) setSuccessMessage("Congrats! Profile created!")
      } catch (err) {
        console.log(err)
      }
    } 
  } 
  
  const onHandleInputChange = async (e: InputEvent) => {
    if (!isConnected) return
    setHandle(e.target.value)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-16">        
      { !isConnected ? (
        <button
          className="py-2 px-4 ml-2 rounded-3xl bg-red-600"
          disabled={isLoginPending}
          onClick={onLoginClick}
        >
          Log in
        </button>
      ) : (
        <p>{`Connected to: ${address}`}</p>
      )}
        <form onSubmit={onSubmit}>
          <input
            minLength={5}
            maxLength={31}
            required
            type="text"
            value={handle}
            placeholder="Enter your new Lens handle"
            disabled={isCreatePending}
            className="py-2 px-4 rounded-3xl max-w-content text-black"
            onChange={onHandleInputChange}
          />
          
          <button className="py-2 px-4 ml-2 mb-8 rounded-3xl bg-red-600" type="submit">Create</button>
          
          {successMessage && <p>{successMessage}</p>}
          {loginError && <p>{loginError.message}</p>}
          {createError && <p>{createError.message}</p>}
        </form>
    </main>
  )
}
