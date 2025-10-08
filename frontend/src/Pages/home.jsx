import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import InputBox from '../components/input';
import axios from 'axios';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setOutput('');
    
    try {
      console.log('Generating prompt for:', prompt);
      const response = await axios.post(`http://localhost:3000/api/prompt/generate`, {prompt})
      setOutput(response.data.aireply);
      setLoading(false);
      console.log('Received response:', response.data);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && prompt.trim()) {
      handleClick();
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white relative transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive mouse follower */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isHovering ? 1 : 0
        }}
      />

      {/* Multi-layered animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs with hover speed boost */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: `float ${isHovering ? '10s' : '20s'} ease-in-out infinite`,
            transform: isHovering ? `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` : 'translate(0, 0)'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: `float ${isHovering ? '12s' : '25s'} ease-in-out infinite`,
            animationDelay: '5s',
            transform: isHovering ? `translate(${-mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)` : 'translate(0, 0)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: `float ${isHovering ? '15s' : '30s'} ease-in-out infinite`,
            animationDelay: '10s',
            transform: isHovering ? `translate(${mousePos.x * 0.01}px, ${-mousePos.y * 0.01}px)` : 'translate(0, 0)'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: `float ${isHovering ? '11s' : '22s'} ease-in-out infinite`,
            animationDelay: '15s',
            transform: isHovering ? `translate(${-mousePos.x * 0.018}px, ${-mousePos.y * 0.018}px)` : 'translate(0, 0)'
          }}
        ></div>
        
        {/* Rotating gradient rings with hover speed */}
        <div 
          className="absolute top-0 left-0 w-full h-full transition-all duration-500"
          style={{animation: `rotate ${isHovering ? '20s' : '40s'} linear infinite`}}
        >
          <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] border-2 border-purple-500/10 rounded-full"></div>
        </div>
        <div 
          className="absolute top-0 left-0 w-full h-full transition-all duration-500"
          style={{animation: `rotateReverse ${isHovering ? '25s' : '50s'} linear infinite`}}
        >
          <div className="absolute bottom-1/4 right-1/2 w-[500px] h-[500px] border-2 border-blue-500/10 rounded-full"></div>
        </div>
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 transition-opacity duration-500" 
          style={{
            opacity: isHovering ? 0.4 : 0.2,
            animation: `gridMove ${isHovering ? '10s' : '20s'} linear infinite`,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating particles with hover intensity */}
        {[
          { top: '10%', left: '20%', color: 'purple', delay: '0s', duration: '15s' },
          { top: '30%', right: '15%', color: 'blue', delay: '3s', duration: '18s' },
          { bottom: '25%', left: '35%', color: 'pink', delay: '6s', duration: '20s' },
          { top: '60%', right: '40%', color: 'cyan', delay: '9s', duration: '16s' },
          { bottom: '40%', left: '60%', color: 'purple', delay: '12s', duration: '22s' }
        ].map((particle, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-${particle.color}-400/40 rounded-full transition-all duration-500`}
            style={{
              ...Object.fromEntries(Object.entries(particle).filter(([k]) => ['top', 'left', 'right', 'bottom'].includes(k))),
              animation: `particle ${isHovering ? '8s' : particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
              opacity: isHovering ? 1 : 0.5,
              transform: isHovering ? 'scale(1.5)' : 'scale(1)'
            }}
          />
        ))}
        
        {/* Scanning lines with hover speed */}
        <div 
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent transition-all duration-500"
          style={{
            animation: `scan ${isHovering ? '4s' : '8s'} ease-in-out infinite`,
            opacity: isHovering ? 1 : 0.5
          }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transition-all duration-500"
          style={{
            animation: `scan ${isHovering ? '5s' : '10s'} ease-in-out infinite`,
            animationDelay: '4s',
            opacity: isHovering ? 1 : 0.5
          }}
        ></div>
        
        {/* Radial pulse from center with hover intensity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className="w-[800px] h-[800px] border border-white/5 rounded-full transition-all duration-500"
            style={{
              animation: `pulse ${isHovering ? '2s' : '4s'} ease-in-out infinite`,
              borderColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full transition-all duration-500"
            style={{
              animation: `pulse ${isHovering ? '2s' : '4s'} ease-in-out infinite`,
              animationDelay: '1s',
              borderColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full transition-all duration-500"
            style={{
              animation: `pulse ${isHovering ? '2s' : '4s'} ease-in-out infinite`,
              animationDelay: '2s',
              borderColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
            }}
          ></div>
        </div>
        
        {/* Aurora wave effect */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent transition-all duration-1000"
          style={{
            animation: `wave ${isHovering ? '8s' : '15s'} ease-in-out infinite`,
            opacity: isHovering ? 0.6 : 0.3
          }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent transition-all duration-1000"
          style={{
            animation: `wave ${isHovering ? '9s' : '18s'} ease-in-out infinite`,
            animationDelay: '7s',
            opacity: isHovering ? 0.6 : 0.3
          }}
        ></div>
      </div>

      <div className="flex flex-col h-screen relative z-10">
  
        {/* Animated header with slide in */}
        <div className="m-6 flex items-center gap-3 animate-[slideDown_0.6s_ease-out]">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-white/50">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-semibold text-white">
            PromptGen
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-6">
          {/* Animated title with stagger effect */}
          <div className="text-center mb-16 max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white inline-block animate-[fadeInUp_0.8s_ease-out]">
                Prompt
              </span>
              <br />
              <span className="text-gray-500 inline-block animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0" style={{animationFillMode: 'forwards'}}>
                Generator
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-xl mx-auto animate-[fadeIn_1s_ease-out_0.4s] opacity-0" style={{animationFillMode: 'forwards'}}>
              Generate perfect prompts for your ideas, writing, and projects
            </p>
          </div>

          {/* Animated input container */}
          <div className="w-full max-w-2xl animate-[fadeInUp_0.8s_ease-out_0.6s] opacity-0" style={{animationFillMode: 'forwards'}}>
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 transform transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02]">
              <InputBox 
                handleKeyDown={handleKeyDown} 
                handleClick={handleClick}
                value={prompt}
                onChange={handleChange}
              />
              
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <span className="transition-colors duration-300 hover:text-gray-400">Press Enter to generate</span>
                <span className="animate-pulse">↵</span>
              </div>
            </div>

            {/* Animated output container */}
            {(loading || output) && (
              <div className="mt-6 bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 animate-[slideUp_0.5s_ease-out] transform transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-500 font-medium">Generated Output</span>
                </div>
                
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-500 text-sm animate-pulse">Generating...</span>
                  </div>
                ) : (
                  <p className="text-white text-base leading-relaxed whitespace-pre-wrap animate-[fadeIn_0.6s_ease-out]">
                    {output}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Animated footer */}
        <div className="p-6 text-center text-gray-700 text-sm animate-[fadeIn_1s_ease-out_0.8s] opacity-0" style={{animationFillMode: 'forwards'}}>
          Powered by AI
        </div>
      </div>
    </div>
  );
};

export default Home;