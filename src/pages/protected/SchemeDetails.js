import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SchemeDetails from "../../features/schemes/components/ViewSchemePage";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Scheme Details"}))
    }, [])

    return(
        <SchemeDetails />
    )
}

export default InternalPage