import React, { ReactNode } from 'react';

interface props {
  clicky: () => void,
  children: ReactNode,
  aktiv: boolean
}

const Knapp = ({ clicky, children, aktiv }: props) => {
  return (
    <div onClick={clicky}>
      {children}
    </div>
  )
}

export default Knapp;