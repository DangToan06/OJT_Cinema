import { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Mail } from 'lucide-react';

export default function NotFoundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; clientY: number }) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(glitchInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{
                        top: '20%',
                        left: '10%',
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{
                        top: '40%',
                        right: '10%',
                        transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                        animationDelay: '1s',
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{
                        bottom: '20%',
                        left: '50%',
                        transform: `translate(${mousePosition.y}px, ${mousePosition.x}px)`,
                        animationDelay: '2s',
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* 404 Number with glitch effect */}
                <div className="relative mb-8">
                    <h1
                        className={`text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 select-none transition-all duration-200 ${
                            glitchActive ? 'animate-pulse' : ''
                        }`}
                        style={{
                            textShadow: glitchActive
                                ? '3px 3px 0px rgba(236, 72, 153, 0.7), -3px -3px 0px rgba(99, 102, 241, 0.7)'
                                : 'none',
                        }}
                    >
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="text-9xl md:text-[200px] font-black text-white blur-2xl">
                            404
                        </div>
                    </div>
                </div>

                {/* Error message */}
                <div className="mb-8 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
                        The page you're looking for seems to have vanished into
                        the digital void. Don't worry, even the best explorers
                        get lost sometimes.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="group relative px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <Home className="relative z-10 w-5 h-5 group-hover:text-white transition-colors" />
                        <span className="relative z-10 group-hover:text-white transition-colors">
                            Go Home
                        </span>
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="group px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-900 hover:scale-105 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Additional links */}
                <div className="flex flex-wrap gap-6 justify-center text-purple-200">
                    <a
                        href="#"
                        className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
                    >
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Search</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
                    >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Contact Support</span>
                    </a>
                </div>

                {/* Floating elements */}
                <div
                    className="absolute top-10 left-10 w-20 h-20 border-4 border-purple-400 rounded-lg animate-spin opacity-20"
                    style={{ animationDuration: '10s' }}
                />
                <div
                    className="absolute bottom-10 right-10 w-16 h-16 border-4 border-pink-400 rounded-full animate-bounce opacity-20"
                    style={{ animationDelay: '0.5s' }}
                />
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-purple-300 text-sm">
                <p>Error Code: 404 | Page Not Found</p>
            </div>
        </div>
    );
}
