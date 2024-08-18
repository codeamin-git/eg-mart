import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()
    if(loading){
        return <Loader />
    }
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;