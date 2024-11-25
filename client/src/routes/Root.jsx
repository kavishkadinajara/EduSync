import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from '../components/ui/stars-background';

export default function Root() {
    return (
        <>
        <StarsBackground />
        <ShootingStars />
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-8">Welcome to EDUSYNC</h1>
            <div className="flex space-x-4">
                <a href="/student-list" className="px-6 py-3 z-40 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    View Student List
                </a>
                <a href="/student-register" className="px-6 py-3 z-40 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    Register Student
                </a>
            </div>
        </div>
        </>
    )
}
