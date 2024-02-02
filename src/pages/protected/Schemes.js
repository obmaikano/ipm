import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Schemes from "../../features/schemes";

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Schemes"}))
    }, [])

    return(
        <Schemes />
    )
}

export default InternalPage