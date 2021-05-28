import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IViewport {
  width: number,
  height: number
}

const ViewportContext = createContext<IViewport>({
  width: 1024,
  height: 768
})

export const ViewportProvider = ({ children }) => {
  if (typeof window === 'undefined') return children;

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  return useContext<IViewport>(ViewportContext)
}