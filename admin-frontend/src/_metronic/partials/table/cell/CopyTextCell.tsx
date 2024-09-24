/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

type Props = {
    value: string
}

const CopyTextCell: FC<Props & any> = ({value, ...props}) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 300)
        }
    }, [copied, setCopied])

    return (
        <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <span
          className='cursor-pointer'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          title='Copy'
      >
        <>{!copied ? value : 'Copied'}</>
      </span>
        </CopyToClipboard>
    )
}
export {CopyTextCell}
