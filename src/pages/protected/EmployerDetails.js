import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPageTitle } from "../../features/common/headerSlice"
import EmployerDetails from "../../features/employers/components/ViewEmployerPage"

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Employer Details"}))
    }, [])

    return(
        <EmployerDetails />
    )
}

export default InternalPage