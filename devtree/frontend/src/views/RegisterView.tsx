import { Link } from 'react-router-dom';
export default function RegisterView() {
  return (
    <>
            <div className="text-6xl">RegisterView</div>
            <br></br>
            <nav>
                <Link to="/auth/login">Do you have account? -- Go to Login</Link>
            </nav>
        </>
  )
}
