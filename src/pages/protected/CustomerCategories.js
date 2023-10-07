import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import CustomerCategories from "../../features/customerCategories";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ titls : "Customer Categories"}))
    }, [])

    return (
        <CustomerCategories />
    )
}

export default InternalPage