
import axios from 'axios'
import capitalize from 'capitalize-the-first-letter'
import React, { useState, useEffect } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'


function SelectBoxSecondary(props){
    
    const {labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, fieldLabel, options, updateType, updateFormValue} = props

    const [value, setValue] = useState(options && options.length > 0 ? defaultValue || options[0].value : defaultValue);

    const updateValue = (newValue) =>{
        updateFormValue({updateType, value : newValue})
        setValue(newValue)
    }


    return (
        <div className={`inline-block ${containerStyle}`}>
            <label  className={`label  ${labelStyle}`}>
                <div className="label-text">{labelTitle}
                {labelDescription && <div className="tooltip tooltip-right" data-tip={labelDescription}><InformationCircleIcon className='w-4 h-4'/></div>}
                </div>
            </label>

            <select className="select select-bordered w-full" value={value} onChange={(e) => updateValue(e.target.value)}>
                <option disabled value="PLACEHOLDER">{placeholder}</option>
                {
                    options.map((o, k) => {
                        return <option value={o.id || o.id} key={k}>{o[fieldLabel]}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectBoxSecondary