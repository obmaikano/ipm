import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useEffect } from "react";
import Policies from "../../features/policies";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Policies" }))
    }, [])

    return(
        <Policies />
    )
}

export default InternalPage