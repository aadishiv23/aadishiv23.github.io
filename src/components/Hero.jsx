import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Constant animation for background elements
  useEffect(() => {
    const interval = setInterval(() => {
      setMousePosition(prev => ({
        x: Math.sin(Date.now() / 3000) * 0.2,
        y: Math.cos(Date.now() / 4000) * 0.2,
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
      
      // Animated code elements - smoother animation
      const codeElements = document.querySelectorAll('.code-element');
      
      // Create DVD-like bounce animation
      codeElements.forEach((element) => {
        // Set initial random position and direction
        const startX = Math.random() * 80 + 10; // Keep away from extreme edges
        const startY = Math.random() * 80 + 10;
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionY = Math.random() > 0.5 ? 1 : -1;
        const speed = Math.random() * 15 + 10; // Speed factor (higher = slower)
        
        gsap.set(element, {
          left: `${startX}%`,
          top: `${startY}%`,
          xPercent: -50, // Center the element
          yPercent: -50,
          opacity: Math.random() * 0.1 + 0.05, // Start with low opacity
          rotation: Math.random() * 10 - 5, // Slight rotation
        });
        
        // Create a timeline for each element
        const tl = gsap.timeline({
          repeat: -1,
          onRepeat: function() {
            // Get the current transform and bounds
            const bounds = element.getBoundingClientRect();
            const viewWidth = window.innerWidth;
            const viewHeight = window.innerHeight;
            const elementWidth = bounds.width;
            const elementHeight = bounds.height;
            
            // Determine next position with bounce logic
            let nextX = gsap.getProperty(element, "left");
            let nextY = gsap.getProperty(element, "top");
            let newDirX = this.vars.directionX;
            let newDirY = this.vars.directionY;
            
            // Add small random factor to movement
            nextX += (Math.random() * 3 + 7) * newDirX;
            nextY += (Math.random() * 3 + 5) * newDirY;
            
            // Handle bounds - percentage-based boundary check with buffer
            if (nextX < 5 || nextX > 95) newDirX *= -1;
            if (nextY < 5 || nextY > 95) newDirY *= -1;
            
            // Update the timeline data
            this.vars.directionX = newDirX;
            this.vars.directionY = newDirY;
            
            // Set next animation target
            gsap.to(element, {
              left: `${nextX}%`,
              top: `${nextY}%`,
              duration: speed,
              ease: "linear"
            });
          },
          directionX: directionX,
          directionY: directionY
        });
        
        // Start the first movement
        tl.to(element, {
          left: `${startX + 10 * directionX}%`,
          top: `${startY + 8 * directionY}%`,
          duration: speed,
          ease: "linear"
        });
        
        // Separate animation for opacity to make it more subtle
        gsap.to(element, {
          opacity: Math.random() * 0.15 + 0.05,
          duration: Math.random() * 15 + 8, // Slower opacity change
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // iOS-style glass morphism card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7 + (i * 0.2),
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1], // iOS animation curve
      }
    })
  };

  return (
    <section
      ref={heroRef}
      className="h-screen flex items-center justify-center text-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0a84ff 0%, #003366 70%, #001133 100%)',
      }}
    >
      {/* Dynamic background elements - iOS app icons style */}
      <div className="absolute inset-0 overflow-hidden">
        {/* SwiftUI symbols floating in background */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="code-element absolute text-white text-sm md:text-base"
            style={{
              fontFamily: "monospace",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            {[
              "struct ContentView {}",
              "@State private var",
              ".animation(.spring())",
              "VStack { }",
              "SwiftUI",
              "ZStack { }",
              ".padding()",
              ".foregroundColor(.blue)",
              ".frame(width: 300)",
              "List { ForEach }",
              "@ObservableObject",
              "NavigationView { }",
              ".cornerRadius(12)",
              ".opacity(0.8)",
              "HStack { }",
              "@MainActor",
              "Task { }",
              "The compiler is unable to type-check this expression",
              "withAnimation(.easeInOut) { }",
              "TabView { }",
              "LazyVGrid(columns: columns)",
              "ScrollView { }",
              "GeometryReader { geo in }",
              "Color.accentColor",
              "@EnvironmentObject",
              "import SwiftUI",
              "import Combine",
              "() -> Void",
            ][i % 25]}
          </div>
        ))}
      </div>

      {/* Constantly animating iOS-style blur orbs */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20"
        animate={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30
        }}
        transition={{ type: "tween", duration: 3, ease: "easeInOut" }}
        style={{ left: '20%', top: '30%' }}
      />
      
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-purple-600 filter blur-3xl opacity-10"
        animate={{
          x: mousePosition.x * 40,
          y: mousePosition.y * 40
        }}
        transition={{ type: "tween", duration: 4, ease: "easeInOut" }}
        style={{ right: '15%', bottom: '20%' }}
      />
      
      <motion.div 
        className="absolute w-72 h-72 rounded-full bg-cyan-400 filter blur-3xl opacity-10"
        animate={{
          x: mousePosition.y * 20,
          y: mousePosition.x * -20
        }}
        transition={{ type: "tween", duration: 5, ease: "easeInOut" }}
        style={{ left: '50%', top: '60%' }}
      />

      {/* Content container with iOS-style glass morphism */}
      <div ref={textRef} className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-6xl md:text-8xl font-bold text-white mb-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="inline-block relative">
            Aadi Shiv Malhotra
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            />
          </h1>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          University of Michigan Undergraduate, studying Computer Science & Cognitive Science.
        </motion.p>
        
        {/* iOS App Store style cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: "Builder on Apple Platforms", icon: "􀣺", color: "#30d158" },
            { title: "Computational Biology Explorer", icon: "􀥂", color: "#0a84ff" },
            { title: "Systems Designer & Creator", icon: "􀤑", color: "#ff375f" }
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="relative overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 flex flex-col items-center text-white border border-white border-opacity-20"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div 
                className="text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-xl"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{card.title}</h3>
              <div className="w-12 h-1 bg-white bg-opacity-40 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* iOS-style button */}
        <motion.div
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.a
            href="/projects"
            className="group relative px-8 py-4 text-white font-medium rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 20 20" className="mr-2">
                <path fill="currentColor" d="M7 1L5.6 2.5 13 10l-7.4 7.5L7 19l9-9z" />
              </svg>
            </span>
            <span className="relative z-10 group-hover:translate-x-2 transition-transform inline-flex items-center">
              View My Work
              <svg width="20" height="20" viewBox="0 0 20 20" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <path fill="currentColor" d="M7 1L5.6 2.5 13 10l-7.4 7.5L7 19l9-9z" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}