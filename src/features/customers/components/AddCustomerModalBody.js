import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from "../../../components/Input/InputText"
import ErrorText from "../../../components/Typography/ErrorText"
import { showNotification } from "../../common/headerSlice"
import { addNewCustomer } from "../customerSlice"

const INITIAL_CUSTOMER_OBJ = {
    first_name : "",
    last_name : "",
    other_name : "",
    gender : "",
    date_of_birth : "",
    payroll_number : ""
}

function AddCustomerModalBody({closeModal}) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [customerObj, setCustomerObj] = useState(INITIAL_CUSTOMER_OBJ)

    const saveNewCustomer = () => {
        if(customerObj.first_name.trim() === "") return setErrorMessage("First Name is required!")
        else {
            let newCustomerObj = {
                "first_name" : customerObj.first_name,
                "last_name": customerObj.last_name,
                "other_name": customerObj.other_name,
                "gender": customerObj.gender,
                "date_of_birth": customerObj.date_of_birth,
                "payroll_number": customerObj.payroll_number
            }
            dispatch(addNewCustomer({newCustomerObj}))
            dispatch(showNotification({message : "New Customer Added!", status : 1}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setCustomerObj({...customerObj, [updateType] : value})
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText type="text" defaultValue={customerObj.first_name} updateType="first_name" containerStyle="mt-4" labelTitle="First Name" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue={customerObj.other_name} updateType="other_name" containerStyle="mt-4" labelTitle="Other Name" updateFormValue={updateFormValue} />
            </div>
           
            <div className="divider" ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText type="text" defaultValue={customerObj.last_name} updateType="last_name" containerStyle="mt-4" labelTitle="Surname" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue={customerObj.payroll_number} updateType="payroll_number" containerStyle="mt-4" labelTitle="Payroll Number" updateFormValue={updateFormValue} />
            </div>

            <div className="divider" ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText type="date" defaultValue={customerObj.date_of_birth} updateType="date_of_birth" containerStyle="mt-4" labelTitle="Date of Birth" updateFormValue={updateFormValue} />
                <InputText type="text" defaultValue={customerObj.gender} updateType="gender" containerStyle="mt-4" labelTitle="Gender" updateFormValue={updateFormValue} />
            </div>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewCustomer()}>Save</button>
            </div>
        </>
    )
}

export default AddCustomerModalBody