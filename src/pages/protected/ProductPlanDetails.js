import { useDispatch } from "react-redux"
import { setPageTitle } from "../../features/common/headerSlice"
import { useEffect } from "react"
import ProductPlanDetails from "../../features/schemes/components/ViewProductPlanPage"

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product Plan Details"}))
    }, [])

    return(
        <ProductPlanDetails />
    )
}

export default InternalPage