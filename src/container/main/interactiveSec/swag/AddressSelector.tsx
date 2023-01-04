import React, { FC, useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import xss from 'xss'


// import { useActions, useTypedSelector } from '../../../../hooks'
import { debounce } from '../../../../lib/fn'


type AddressSelectorProps = {
    setThanks:any
}

// type CityName = keyof typeof cityData

const AddressSelector: FC<AddressSelectorProps> = ({ setThanks }) => {
    // const [province, setProvince] = useState(provinceData[0].name)
    // const [cities, setCities] = useState(cityData[provinceData[0].id])
    // const [cityValue, setCityValue] = useState(cityData[provinceData[0].id][0].name)
    // const [cityCode, setCityCode] = useState('')
    // const [area, setArea] = useState<{ city: string; name: string; id: string }[]>([])
    // const [areaValue, setAreaValue] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputPhone, setInputPhone] = useState('')
    const [inputAddress, setInputAddress] = useState('')

    // const { onPostUserReceiptInfo, updateSwagFinish } = useActions()

    const {
        user: { _id, name },
    }:any = {}

    const handleInputName = debounce((val: string) => setInputName(val))
    const handleInputPhone = debounce((val: string) => setInputPhone(val))
    const handleInputAddress = debounce((val: string) => setInputAddress(val))

    useEffect(() => {
        setInputName(name)
    }, [])

   

    const handleSummit = () => {
        const address = xss(inputAddress)
        const name = xss(inputName)
        const phone = xss(inputPhone)
        setThanks(true)

        setTimeout(() => {
            // onPostUserReceiptInfo({ uid: _id, address, name, phone })
            // updateSwagFinish()
            setThanks(false)
        }, 3000)
    }

    return (
        <div className="swag-collapse-add-receipt-form">
            <div className="swag-collapse-add-receipt-input">
                <div>收件人</div>
                <Input defaultValue={name} onChange={(e) => handleInputName(e.target.value)} />
            </div>
            <div className="swag-collapse-add-receipt-input">
                <div>收件电话</div>
                <Input onChange={(e) => handleInputPhone(e.target.value)} />
            </div>
            <div className="swag-collapse-add-receipt-input">
                <div>收件地址</div>
                <Input onChange={(e) => handleInputAddress(e.target.value)} />
            </div>
            <div>
                <Button onClick={handleSummit} disabled={!inputAddress || !inputName || !inputPhone}>
                    提交
                </Button>
            </div>
        </div>
    )
}

export default AddressSelector
