import { useState } from 'react'
import type { UserData } from './types/chat'
import LoginScreen from './components/LoginScreen'
import ChatRoom from './components/ChatRoom'

function App() {
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleJoin = (data: UserData) => {
    setUserData(data)
  }

  const handleDisconnect = () => {
    setUserData(null)
  }

  return (
    <>
      {!userData ? (
        <LoginScreen onJoin={handleJoin} />
      ) : (
        <ChatRoom userData={userData} onDisconnect={handleDisconnect} />
      )}
    </>
  )
}

export default App
