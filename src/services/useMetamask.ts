import { useSDK } from '@metamask/sdk-react'
import { useState } from 'react'

export const useMetamask = () => {
    const [account, setAccount] = useState<string>('')

    const { sdk, connected, connecting, provider, chainId } = useSDK()

    const connect = async () => {
        try {
            const accounts = await sdk?.connect()
            setAccount(accounts?.[0])
        } catch (err) {
            console.warn('Failed to connect..', err)
        }
    }

    const disconnect = async () => {
        try {
            if (sdk) {
                await sdk.terminate()
                setAccount('')
            }
        } catch (err) {
            console.warn('Failed to disconnect..', err)
        }
    }

    return {
        account,
        connect,
        disconnect,
        chainId,
        connected,
        connecting,
        provider
    }
}
