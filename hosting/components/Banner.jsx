
import { useState, useEffect } from 'react'
import { ExclamationTriangleIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon} from '@heroicons/react/20/solid'

export default function Banner({type, children}) {
    const [icon, setIcon] = useState(<ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />)
    const [divCSS ,setDivCSS] = useState(null)
    const [innerCSS, setInnerCSS] = useState(null)

    useEffect(() => {
        switch(type) {
            case 'success':
                setDivCSS('border-l-4 p-4 border-green-400 bg-green-50')
                setInnerCSS('text-sm text-green-700')
                setIcon(<CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />)
                break;
            case 'error':
                setDivCSS('border-l-4 p-4 border-red-400 bg-red-50')
                setInnerCSS('text-sm text-red-700')
                setIcon(<ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />)
                break;
            case 'warning':
                setDivCSS('border-l-4 p-4 border-yellow-400 bg-yellow-50')
                setInnerCSS('text-sm text-yellow-700')
                setIcon(<ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />)
                break;
            case 'info':
                setDivCSS('border-l-4 p-4 border-blue-400 bg-blue-50')
                setInnerCSS('text-sm text-blue-700')
                setIcon(<InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />)
                break;
            default:
                setDivCSS('border-l-4 p-4 border-yellow-400 bg-yellow-50')
                setInnerCSS('text-sm text-yellow-700')
                setIcon(<ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />)
        }
    }, [type])

    return (
      <div className={divCSS}>
        <div className="flex">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-3">
            <p className={innerCSS}>
              {children}
            </p>
          </div>
        </div>
      </div>
    );
  }