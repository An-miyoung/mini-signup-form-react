import React, { useContext, useEffect, useRef, useState } from 'react'
import { FormContext } from '../App'

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MESSAGE = {
    required: '필수 정보입니다.',
    inValidId: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.',
    inValidPw: '8~16자의 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    inValidConfirmPw: '비밀번호가 일치하지 않습니다.',
}

const FormInput = ({ id, label, errorData, setErrorData, inputProps }) => {
    const { formData, setFormData } = useContext(FormContext)
    const [hasError, setHasError] = useState(false)

    const inputRef = useRef(null)

    const checkRegEX = (inputId) => {
        let result
        const value = formData[inputId]
        if (value.length === 0) {
            result = 'required'
        } else {
            switch (inputId) {
                case 'id':
                    result = ID_REGEX.test(value) ? true : 'inValidId'

                    break
                case 'pw':
                    result = PW_REGEX.test(value) ? true : 'inValidPw'

                    checkRegEX('confirmPw')
                    break
                case 'confirmPw':
                    result =
                        value === formData['pw'] ? true : 'inValidConfirmPw'

                    break
                default:
                    return
            }
        }
        setErrorData((prev) => ({ ...prev, [inputId]: result }))
        result !== true ? setHasError(true) : setHasError(false)
    }

    useEffect(() => {
        if (id === 'id') {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                ref={inputRef}
                value={formData[id]}
                className={
                    hasError
                        ? 'shadow border rounded w-full py-2 px-3 text-gray-700 border-red-600'
                        : 'shadow border rounded w-full py-2 px-3 text-gray-700'
                }
                onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                }
                onBlur={() => checkRegEX(id)}
                {...inputProps}
            />
            <div className="mt-1 mb-3 text-xs text-red-500">
                {ERROR_MESSAGE[errorData[id]]}
            </div>
        </div>
    )
}

export default FormInput
