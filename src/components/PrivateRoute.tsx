import {Outlet, useNavigate} from "react-router-dom";
import * as React from "react";
import {getUserData, logout} from "../functionality/AuthService";
import {User} from "../models/user";

export default function PrivateRoute(){
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = React.useState<User | null>(null);
    const [isLoading, setLoading] =  React.useState(true);

    React.useEffect(() => {
        getUserData().then((data) => {
            if (data != null){
                console.log("god", data);
                console.log("accepted");
                setUserDetails(data);
                setLoading(false);
            } else {
                console.log("error1", data);
                logout()
                navigate('/login', {state: {appear: "Необохидмо зайти в систему"}})
            }
        })
    }, []);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : <Outlet context={[userDetails, setUserDetails]} />}
            {/* Render the fetched data here */}
        </div>
    )

}
