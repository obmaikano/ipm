import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddCustomerModalBody from '../features/persons/components/AddCustomerModalBody'
import AddCustomerCategoryModalBody from '../features/customerCategories/components/AddCustomerCategoryModalBody'
import AddPolicyModalBody from '../features/policies/components/AddPolicyModalBody'
import AddEmployerModalBody from '../features/employers/components/AddEmployerModal'

function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.LEAD_ADD_NEW] : <AddLeadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CUSTOMER_ADD_NEW] : <AddCustomerModalBody closeModal={close} size='lg' extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.EMPLOYER_ADD_NEW] : <AddEmployerModalBody closeModal={close} size='lg' extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.POLICY_ADD_NEW] : <AddPolicyModalBody closeModal={close} size='lg' extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CUSTOMER_CATEGORY_ADD_NEW] : <AddCustomerCategoryModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout