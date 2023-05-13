import React from 'react'
import { Clipboard, Scan, QrCode, Barcode, File, FileArrowUp } from '@phosphor-icons/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export type HeaderProps = {}

const Header = ({}: HeaderProps) => {
  return (
    <TooltipPrimitive.Provider>
      <header className="flex items-center justify-between border-b border-neutral-6  pb-8 dark:border-neutralDark-6">
        <div className="flex gap-x-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-3 ring-1 ring-primary-7 dark:bg-primaryDark-3 dark:ring-primaryDark-7">
            <QrCode weight="duotone" className="h-8 w-8 text-primary-9 dark:text-primaryDark-9" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-secondary-9 dark:text-secondaryDark-9">QR Buddy</h1>
            <p className="text-lg leading-none text-neutral-11 dark:text-neutralDark-11">AMZL</p>
          </div>
        </div>
        <div className="flex gap-x-3">
          <div className="inline-flex items-center gap-x-2 bg-neutral-3  p-2 text-neutral-11 dark:bg-neutralDark-1 dark:text-neutralDark-11">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border-0 border-b-2 border-transparent  bg-neutral-1 bg-neutral-3 py-1.5
                    shadow-sm placeholder:text-neutral-10 focus:border-secondary-9 focus:outline-none focus:ring-0 dark:bg-neutralDark-1 dark:placeholder:text-neutralDark-10 sm:text-sm sm:leading-6"
              placeholder="Enter text ..."
            />
            <div className="flex items-center">
              <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                  <button className="inline-flex items-center justify-center border-r border-neutral-7 pr-2 dark:border-neutralDark-7">
                    <Clipboard
                      weight="duotone"
                      className="h-8 w-8 text-neutral-10 hover:text-primary-8 dark:text-neutralDark-10"
                    />
                  </button>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                  arrowPadding={16}
                  className="bg-neutralDark-1 px-2 py-1.5 text-sm text-neutralDark-12"
                >
                  <TooltipPrimitive.Arrow />
                  Paste from the clipboard
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Root>
              <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                  <button className="group inline-flex items-center justify-center pl-2">
                    <FileArrowUp
                      weight="duotone"
                      className="h-8 w-8 text-neutral-10 group-hover:text-primary-8 dark:text-neutralDark-10"
                    />
                  </button>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                  arrowPadding={16}
                  className="bg-neutralDark-1 px-2 py-1.5 text-sm text-neutralDark-12"
                >
                  <TooltipPrimitive.Arrow />
                  Upload a file
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Root>
            </div>
          </div>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <button className="inline-flex items-center justify-center opacity-40">
                <Barcode weight="duotone" className="h-8 w-8 text-secondary-11 dark:text-secondaryDark-11" />
              </button>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Content
              arrowPadding={16}
              className="bg-neutralDark-1 px-2 py-1.5 text-sm text-neutralDark-12"
            >
              <TooltipPrimitive.Arrow />
              Scan within an open webpage.
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Root>
        </div>
      </header>
    </TooltipPrimitive.Provider>
  )
}

export default Header
