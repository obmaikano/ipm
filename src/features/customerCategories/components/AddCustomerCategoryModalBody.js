import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewCustomerCategory } from "../customerCategorySlice"
import { showNotification } from "../../common/headerSlice"
import InputText from "../../../components/Input/InputText"
import ErrorText from "../../../components/Typography/ErrorText"

const INITIAL_CUSTOMER_CATEGORY_OBJ = {
    category_name : "",
    description : "",
}

function AddCustomerCategoryModalBody({closeModal}) {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [customercategoryObj, setCustomerCategoryObj] = useState(INITIAL_CUSTOMER_CATEGORY_OBJ)

    const saveNewCustomerCategory = () => {
        if(customercategoryObj.category_name.trim() === "") return setErrorMessage("Category name is required!")
        else {
            let newCustomerCategoryObj = {
                "category_name" : customercategoryObj.category_name,
                "description" : customercategoryObj.description
            }
            dispatch(addNewCustomerCategory({newCustomerCategoryObj}))
            dispatch(showNotification({message : "New Customer Category Added!", status : 1}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setCustomerCategoryObj({...customercategoryObj, [updateType] : value})
    }

    return (
        <>
            <InputText type="text" defaultValue={customercategoryObj.category_name} updateType="category_name" containerStyle="mt-4" labelTitle="Category Name" updateFormValue={updateFormValue} />

            <InputText type="text" defaultValue={customercategoryObj.description} updateType="description" containerStyle="mt-4" labelTitle="Descriptione" updateFormValue={updateFormValue} />


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewCustomerCategory()}>Save</button>
            </div>
        </>
    )
}

export default AddCustomerCategoryModalBody