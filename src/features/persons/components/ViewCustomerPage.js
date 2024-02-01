import { useDispatch } from "react-redux";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewPolicyModal = () => {
        dispatch(openModal({title : "Add a New Policy", size : "lg", bodyType : MODAL_BODY_TYPES.POLICY_ADD_NEW}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewPolicyModal()}>Add a Policy</button>
        </div>
    )
}

function ViewCustomerDetails() {

    const dispatch = useDispatch()

    return(
        <>
            <TitleCard title="Current Customers" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                
            </TitleCard>
        </>
    )
    
}