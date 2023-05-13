import React from 'react'
import { Share } from '@phosphor-icons/react'

export type FooterProps = {}

const Footer = ({}: FooterProps) => {
  return (
    <footer className="grid h-14 grid-cols-[1fr_auto] rounded bg-neutralDark-1 text-neutral-1 dark:bg-neutralDark-1">
      <div className="grid grid-cols-4 divide-x divide-neutralDark-6">
        <button className="inline-flex items-center justify-center gap-x-2 px-2.5 py-2 hover:bg-neutralDark-4">
          <Share className="h-5 w-5 text-neutral-1" weight="duotone" />
          Share
        </button>
        <div className="inline-flex items-center justify-center px-2.5 py-2">Send</div>
        <div className="inline-flex items-center justify-center px-2.5 py-2">Swap</div>
        <div className="inline-flex items-center justify-center px-2.5 py-2">Stake</div>
      </div>
      <div>...</div>
    </footer>
  )
}

export default Footer
