import { Link } from 'react-router-dom';
 
export default function LoginView() {
  return (
        <>
            <div className="text-6xl">LoginView</div>
            <br></br>
            <nav>
                <Link to="/auth/register">Don't have account -- Go to Register</Link>
            </nav>
        </>
    
  )
}
