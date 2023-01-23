
import {useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignUpMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../store/reducers/AuthSlice';




export function SignUpForm(props: any) {

    const [singUp, {isLoading, isError}] = useSignUpMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();



    return (
        <>

        </>
    )
}

export default SignUpForm;