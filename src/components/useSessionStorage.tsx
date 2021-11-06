import { useState } from "react"

function useSessionStorage<T>(key:string): [T | undefined, (newValue: T) => void] {
  const initialValue = sessionStorage.getItem(key);
  const [persistedValue, setPersistedValue] = useState<T>(
    initialValue ? JSON.parse(initialValue) : initialValue
  )

  const setValue = (newValue:T) => {
    setPersistedValue(newValue)
    sessionStorage.setItem(key, JSON.stringify(newValue))
  }

  return [persistedValue, setValue]
}

export default useSessionStorage;