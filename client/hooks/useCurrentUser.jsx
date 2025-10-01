import React from 'react'
import { useEffect } from 'react'
import { getCurrentUser } from '../apicalls/authCalls'
import { useDispatch } from 'react-redux'
import { setUserData } from '../src/redux/UserSlice.js'


function useCurrentUser() {
    const dispatch = useDispatch()
    
  useEffect(() => {
    async function fetchData(params) {
            const data = await getCurrentUser()
            dispatch(setUserData(data))
    }
    fetchData()
  }, [])

}

export default useCurrentUser