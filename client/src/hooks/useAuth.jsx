import { useContext } from 'react'
import { Authcontext } from '../context/auth/AuthContext'

export default function useAuth() {
  const userInfo = useContext(Authcontext)
  return userInfo;
}
