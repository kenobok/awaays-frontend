import { Link } from 'react-router-dom'
import img404 from '../../src/assets/images/404.png'


const NotFound = () => {
    return (
        <main className='h-[100vh] w-full flex flex-col justify-center items-center'>
            <img src={img404} alt='404 not found' />
            <h1 className='text-[2rem] fon-semibold -translate-y-8'>Page not found</h1>
            <div className='flex space-x-3 justify-center items-center'>
                <Link to='/' className='border-2 border-[var(--p-color)] px-4 py-2 rounded-lg block'>Home</Link>
                <Link to='/give-item' className='border-2 border-[var(--p-color)] px-4 py-2 rounded-lg block'>Give Item</Link>
                <Link to='/giveaway-items' className='border-2 border-[var(--p-color)] px-4 py-2 rounded-lg block'>Giveaways</Link>
            </div>
        </main>
    );
}

export default NotFound;