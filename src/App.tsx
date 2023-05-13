import { useState, type ChangeEvent, FormEvent, useRef, useEffect } from 'react'
import { Copy, X, CheckCircle, MagnifyingGlass, Funnel, Clipboard, FileArrowUp } from '@phosphor-icons/react'
import Footer from './footer'
import Header from './header'
import QrCodePreview from './qr-code-preview'
import clsx from 'clsx'
import QRCode from 'qrcode'
import * as Toast from '@radix-ui/react-toast'
import * as Tooltip from '@radix-ui/react-tooltip'

const generateQR = async (text: string) => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}
const QrCodeItem = ({
  text,
  selected,
  onSelected,
}: {
  text: string
  selected: boolean
  onSelected: (code: string) => void
}) => (
  <>
    <span className="inline-flex rounded-md shadow-sm">
      <span
        className={clsx(
          'inline-flex items-center rounded-l-md border px-2 py-2 ',
          selected
            ? 'border-primary-9 bg-primary-3  dark:border-primaryDark-9 dark:bg-primaryDark-3'
            : 'border-neutral-7 bg-white dark:border-neutralDark-7 dark:bg-neutralDark-3'
        )}
      >
        <label htmlFor="select-all" className="sr-only">
          Select all
        </label>
        <input
          id="select-all"
          type="checkbox"
          name="select-all"
          className={clsx(
            'h-4 w-4 rounded bg-white text-primary-9 focus:ring-primary-9 dark:bg-neutralDark-1',
            selected ? 'border-primary-6 dark:border-primaryDark-6' : 'border-neutral-6 dark:border-neutralDark-6 '
          )}
        />
      </span>
      <label htmlFor="message-type" className="sr-only">
        Select message type
      </label>
      <span
        className={clsx(
          '-ml-px  flex w-full items-center justify-between rounded-l-none',
          'border-0py-1.5 rounded-r-md pl-3 pr-3 text-sm leading-6 ',
          'ring-1 ring-inset ',
          selected
            ? 'bg-primary-3 ring-primary-9 dark:bg-primaryDark-3 dark:ring-primaryDark-9'
            : 'ring-neutral-6 dark:ring-neutralDark-6'
        )}
      >
        <button className="inline-flex max-w-[20ch]  items-center" onClick={() => onSelected(text)}>
          <span className="truncate text-ellipsis">{text}</span>
        </button>
        <button onClick={() => alert('copied')} className="inline-flex items-center justify-center focus:outline-none">
          <Copy
            className={clsx(
              'h-5 w-5',
              selected
                ? 'bg-primary-3 text-primary-9 dark:bg-primaryDark-3'
                : 'bg-white text-neutral-9 dark:bg-neutralDark-3 dark:text-neutralDark-11'
            )}
            weight="duotone"
          />
        </button>
      </span>
    </span>
  </>
)
function App() {
  const [codes, setCodes] = useState<string[]>([])
  const [inputMap, setInputMap] = useState<Map<string, boolean>>(new Map())
  const [checked, setChecked] = useState<string[]>()
  const [input, setInput] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [selected, setSelected] = useState<string | null>('')
  const qrCodeRef = useRef<HTMLCanvasElement>(null)
  const [clipboardData, setClipboardData] = useState<string | null>(null)
  const [duplicateItems, setDuplicateItems] = useState<string[]>([])

  const handleClipboardInput = async () => {
    try {
      // Read text from clipboard
      const text = await navigator.clipboard.readText()

      // Update the input field with clipboard data
      // setInput(text)
      addItems(text)
      // Optionally, update the clipboardData state if you want to use it elsewhere
      setClipboardData(text)
    } catch (err) {
      console.error('Failed to read clipboard contents:', err)
    }
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = evt
    setInput(value.trim())
  }

  const parseInput = (input: string) => {
    return input.split(/[\s\n]+/)
  }
  const addItems = (input: string) => {
    const items = parseInput(input)

    // Create a new map with unique items and track duplicates
    const newInputMap = new Map(inputMap)
    const duplicates: string[] = []
    let lastInsertedItem: string | null = null

    items.forEach(item => {
      if (item) {
        if (newInputMap.has(item)) {
          duplicates.push(item)
        } else {
          newInputMap.set(item, true)
          lastInsertedItem = item
        }
      }
    })

    // Update the inputMap state
    setInputMap(newInputMap)

    // Update the duplicateItems state
    setDuplicateItems(duplicates)

    // Update the selected state with the last inserted item
    setSelected(lastInsertedItem)

    // Call the onSubmit function prop with the unique items
    setCodes(Array.from(newInputMap.keys()))
    setShowToast(true)
    // setCodes(v => [...v, ...items])
    // setSelected(items[items.length - 1])
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    addItems(input)
    setInput('')
  }
  const handleSelected = (code: string) => {
    setSelected(code)
  }

  useEffect(() => {
    // FIXME: assumes input is simple string
    const text = codes.find(a => a === selected)

    QRCode.toCanvas(qrCodeRef.current, text, { type: 'image/webp', width: 256 })
  }, [selected, codes])

  function handleNext() {
    const currentIndex = codes.findIndex(v => v === selected)
    let nextIndex: number
    if (currentIndex === codes.length - 1) {
      nextIndex = 0
    } else {
      nextIndex = currentIndex + 1
    }
    setSelected(codes[nextIndex])
  }
  function handlePrevious() {
    const currentIndex = codes.findIndex(v => v === selected)
    let previousIndex: number
    if (currentIndex === 0) {
      previousIndex = codes.length > 1 ? codes.length - 1 : currentIndex
    } else {
      previousIndex = currentIndex - 1
    }
    setSelected(codes[previousIndex])
  }

  return (
    <>
      <div className="relative grid min-h-screen overflow-hidden">
        <div className="fixed inset-0 grid grid-cols-2">
          <div></div>
          <div className="relative order-last h-full w-full bg-neutral-4">
            <img src="/ricardo-gomez-angel-GsZLXA4JPcM-unsplash.jpg" alt="" className="absolute inset-0 h-full" />
          </div>
        </div>
        <div
          className="isolate mx-auto mt-32 grid max-h-[540px] w-full max-w-screen-md grid-cols-2
          gap-x-8 rounded-xl bg-white px-12 pb-16 pt-20 shadow-2xl ring-1 ring-inset ring-transparent
          dark:bg-neutralDark-2 dark:ring-neutralDark-5"
        >
          <div
            className="grid h-full w-full place-items-center rounded-md bg-neutral-3 shadow-inner shadow-neutral-5
          ring-1 ring-neutral-5 dark:bg-neutralDark-3 dark:shadow-neutralDark-5 dark:ring-neutralDark-5"
          >
            <div className="relative h-64 w-64 rounded-lg bg-white shadow-md ring-1 ring-neutral-5 dark:bg-neutralDark-1 dark:shadow-neutralDark-1 dark:ring-neutralDark-5">
              <canvas id="qr-code" className="absolute inset-0" ref={qrCodeRef}></canvas>
            </div>

            <div className="flex justify-center">
              <nav aria-label="Pagination">
                <ul className="inline-flex items-center space-x-1 rounded-md text-sm">
                  <li>
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center space-x-2 rounded-full border border-neutral-7
                      bg-white px-2 py-2 font-medium text-neutral-10 hover:bg-neutral-4 dark:border-neutralDark-7 dark:bg-neutralDark-5 dark:hover:bg-neutralDark-7"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  <li>
                    <span className="inline-flex items-center space-x-1 rounded-md bg-neutral-3 px-4 py-2 text-gray-500 dark:bg-neutralDark-3">
                      Item <b className="mx-1">{codes.findIndex(v => v === selected) + 1}</b> of{' '}
                      <b className="ml-1">{codes.length}</b>
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center space-x-2 rounded-full border border-neutral-7
                      bg-white px-2 py-2 font-medium text-neutral-10 hover:bg-neutral-4 dark:border-neutralDark-7 dark:bg-neutralDark-5 dark:hover:bg-neutralDark-7"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <button
              type="button"
              className="hidden rounded-md bg-secondary-9 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-10 focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-secondaryDark-9 dark:hover:bg-secondaryDark-10"
            >
              Generate
            </button>
          </div>
          <div className="flex h-96 w-full flex-col gap-y-4">
            <Tooltip.Provider>
              <header className="flex items-center gap-x-6">
                <form onSubmit={handleSubmit} className="flex gap-x-4" action="#">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="search" className="sr-only">
                      Enter text
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlass
                          className="h-5 w-5 text-neutralDark-9 dark:text-neutralDark-9"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        value={input}
                        onChange={handleInputChange}
                        type="search"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-neutral-7
                      placeholder:text-neutral-9 focus:ring-2 focus:ring-inset focus:ring-primary-9 dark:bg-neutralDark-3 dark:ring-neutralDark-7 dark:placeholder:text-neutralDark-9 dark:focus:ring-primaryDark-9 sm:text-sm sm:leading-6"
                        placeholder="enter text"
                      />
                    </div>
                  </div>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={handleClipboardInput}
                        type="submit"
                        className="group inline-flex justify-center rounded-md bg-white px-2.5 py-1.5 shadow-sm
                  ring-1 ring-inset ring-neutral-7 hover:bg-neutral-3 hover:ring-neutral-8"
                      >
                        <Clipboard
                          weight="duotone"
                          className="h-6 w-6 text-neutral-9 group-hover:text-neutral-11 dark:text-neutralDark-9
                    dark:group-hover:text-neutralDark-11"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Search</span>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="rounded bg-black px-2 py-1.5 text-sm text-white">
                      Paste from clipboard
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Root>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        type="submit"
                        className="group inline-flex justify-center rounded-md bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-neutral-7
                  hover:bg-neutral-3 hover:ring-neutral-8 dark:bg-neutralDark-3 dark:ring-neutralDark-7 dark:hover:bg-neutralDark-3 dark:hover:ring-neutralDark-8"
                      >
                        <FileArrowUp
                          weight="duotone"
                          className="h-6 w-6 text-neutral-9 group-hover:text-neutral-11"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Search</span>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content className="rounded bg-black px-2 py-1.5 text-sm text-white">
                      Upload a file (csv,json,txt)
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </form>
              </header>
            </Tooltip.Provider>
            <div className="flex flex-col gap-y-3 overflow-hidden">
              <div className="flex items-center justify-between rounded bg-neutral-3 px-2 py-1.5 text-sm dark:bg-neutralDark-6">
                <span className="font-semibold">Results</span>
                <span className="text-neutral-11">{!codes.length ? 'empty' : codes.length}</span>
              </div>
              <ol className="grid list-decimal gap-2 overflow-y-auto">
                {codes.map((code, index) => (
                  <li className="grid grid-cols-[auto_1fr] items-center gap-x-3">
                    <span className="w-12">{`${index + 1}.`}</span>
                    <QrCodeItem onSelected={handleSelected} selected={code === selected} text={code} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Toast.Root open={showToast} onOpenChange={setShowToast}>
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{`Generated ${codes.length} items`}</p>
                    <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShowToast(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Toast.Root>
    </>
  )
}

export default App
