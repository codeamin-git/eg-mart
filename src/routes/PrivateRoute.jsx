import { Navigate } from "react-router-dom";
import Loader from "../components/shared/Loader/Loader";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()
    if(loading){
        return <Loader />
    }
    if(!user){
        return <Navigate to='/'></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;