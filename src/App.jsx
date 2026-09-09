import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PerfumeFinder from './components/PerfumeFinder';
import Notes from './components/Notes';
import Blog from './components/Blog';
import BuyPerfume from './components/BuyPerfume';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
    const [activeSection, setActiveSection] = useState('home');

    const renderSection = () => {
        switch (activeSection) {
            case 'home':
                return <Hero setActiveSection={setActiveSection} />;
            case 'perfumefind':
                return <PerfumeFinder />;
            case 'notes':
                return <Notes />;
            case 'blog':
                return <Blog />;
            case 'buy':
                return <BuyPerfume />;
            case 'login':
                return <Login setActiveSection={setActiveSection} />;
            case 'profile':
                return <Profile />;
            default:
                return <Hero setActiveSection={setActiveSection} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="transition-all duration-500 ease-in-out">
                {renderSection()}
            </main>
        </div>
    );
}

export default App;