import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lottie-animation/error.json';
import { Link } from 'react-router';

export default function Error() {
  return (
    <div className='max-w-2xl mx-auto h-screen p-10'>
        <Lottie animationData={errorAnimation} loop={true} className="w-full" />
        <div className='text-center'>
            <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
        </div>
    </div>
  )
}
