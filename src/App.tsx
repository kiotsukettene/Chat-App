import { useState } from 'react'
import type { UserData } from './types/chat'
import LoginScreen from './components/LoginScreen'
import ChatRoom from './components/ChatRoom'

function App() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showDisconnectNotice, setShowDisconnectNotice] = useState(false)

  const handleJoin = (data: UserData) => {
    setUserData(data)
    setShowDisconnectNotice(false)
  }

  const handleDisconnect = () => {
    setUserData(null)
    setShowDisconnectNotice(true)
  }

  return (
    <>
      {!userData ? (
        <LoginScreen onJoin={handleJoin} showDisconnectNotice={showDisconnectNotice} />
      ) : (
        <ChatRoom userData={userData} onDisconnect={handleDisconnect} />
      )}
    </>
  )
}

export default App
