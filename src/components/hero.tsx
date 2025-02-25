"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  lifecycle: number;
  life: number;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const hueRef = useRef<number>(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // Update dimensions when resizing
  const resizeCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas dimensions to match display size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Store dimensions for calculations
    dimensionsRef.current = { width: rect.width, height: rect.height };
    
    // Recreate particles when resizing
    createInitialParticles();
  };

  useEffect(() => {
    // Handle mouse movement - get position relative to canvas
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      // Calculate mouse position relative to canvas
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Set initial mouse position to center of canvas
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      mousePositionRef.current = { x: width / 2, y: height / 2 };
    }
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize canvas
    resizeCanvas();
    
    // Initial particles
    createInitialParticles();
    
    // Animation loop
    startAnimation();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const createInitialParticles = () => {
    if (!canvasRef.current) return;
    
    const { width, height } = dimensionsRef.current;
    
    // Create initial particles - more particles for better visibility
    particlesRef.current = Array(150).fill(0).map(() => createParticle(
      Math.random() * width,
      Math.random() * height
    ));
  };

  const createParticle = (x: number, y: number): Particle => {
    // Generate a color based on position - brighter colors
    const hue = (hueRef.current + Math.random() * 60) % 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = isDarkMode ? 60 + Math.random() * 20 : 50 + Math.random() * 20;
    const alpha = 0.6 + Math.random() * 0.4; // Higher alpha for better visibility
    
    return {
      x: isFinite(x) ? x : Math.random() * dimensionsRef.current.width,
      y: isFinite(y) ? y : Math.random() * dimensionsRef.current.height,
      size: 2 + Math.random() * 4, // Larger particles
      color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.6, // Faster movement
      oscillationSpeed: 0.001 + Math.random() * 0.008,
      oscillationDistance: 0.2 + Math.random() * 2,
      lifecycle: 100 + Math.random() * 200,
      life: 0
    };
  };

  const startAnimation = () => {
    const animate = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Completely clear the canvas on each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Optional: Add a very slight fade effect if desired
        // Use appropriate color based on theme with very high transparency
        ctx.fillStyle = isDarkMode 
          ? 'rgba(20, 20, 30, 0.03)' // Dark mode - very dark blue with very low opacity
          : 'rgba(255, 255, 255, 0.03)'; // Light mode - white with very low opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Slowly shift the base hue
        hueRef.current = (hueRef.current + 0.2) % 360;
        
        // Update and draw particles
        updateParticles(ctx);
        
        // Add new particles more frequently
        if (Math.random() > 0.85) {
          const { x, y } = mousePositionRef.current;
          const randomOffsetX = (Math.random() - 0.5) * 200;
          const randomOffsetY = (Math.random() - 0.5) * 200;
          
          particlesRef.current.push(createParticle(
            x + randomOffsetX, 
            y + randomOffsetY
          ));
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const updateParticles = (ctx: CanvasRenderingContext2D) => {
    // Calculate flow field
    const { width, height } = dimensionsRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    const time = Date.now() * 0.001;
    
    particlesRef.current = particlesRef.current
      .filter(p => p.life < p.lifecycle)
      .map(particle => {
        // Update particle life
        particle.life++;
        
        // Calculate flow field influence
        const nx = particle.x / width - 0.5;
        const ny = particle.y / height - 0.5;
        
        // Mouse influence - create a flowing effect away/toward the mouse
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        
        // Add safety check to prevent division by zero or very small numbers
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001; // Ensure dist is never zero
        
        // Limit the maximum influence to prevent extreme values
        const mouseInfluence = Math.min(1, 8000 / (dist * dist + 8000)) * 0.5;
        
        // Flow field angle - creates an organic, flowing pattern
        const fieldAngle = Math.sin(nx * 3 + time) * Math.cos(ny * 3 + time * 0.5) * Math.PI;
        
        // Combine influences with safety checks
        particle.angle = (isFinite(fieldAngle) ? fieldAngle : 0) + 
                         (isFinite(Math.atan2(dy, dx)) ? Math.atan2(dy, dx) * mouseInfluence : 0) + 
                         (isFinite(Math.sin(particle.life * particle.oscillationSpeed)) ? 
                           Math.sin(particle.life * particle.oscillationSpeed) * particle.oscillationDistance : 0);
        
        // Ensure angle is finite
        if (!isFinite(particle.angle)) {
          particle.angle = Math.random() * Math.PI * 2; // Fallback to random angle
        }
        
        // Fade in and out based on lifecycle
        const fadeFactor = Math.min(
          particle.life / 20,
          (particle.lifecycle - particle.life) / 20,
          1
        );
        
        // Ensure fadeFactor is positive
        const safeFadeFactor = Math.max(0.001, fadeFactor);
        
        // Move particle
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Draw particle with glow effect for better visibility
        const glow = Math.max(0.1, particle.size * 2); // Ensure glow is positive
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glow
        );
        
        // Extract hue from the color
        const hueMatch = particle.color.match(/hsla\((\d+)/);
        const hue = hueMatch ? parseInt(hueMatch[1]) : hueRef.current;
        
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${safeFadeFactor * 0.8})`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
        
        // Begin path for glow
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          glow,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw the core of the particle
        const particleRadius = Math.max(0.1, particle.size * safeFadeFactor); // Ensure radius is positive
        
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particleRadius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Check boundaries and reset position if needed
        if (
          particle.x < -50 ||
          particle.x > width + 50 ||
          particle.y < -50 ||
          particle.y > height + 50
        ) {
          // Bring back to canvas with a new starting position
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.life = 0;
        }
        
        return particle;
      });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Full screen canvas for the animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Subtle gradient background to ensure visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10 opacity-80 z-0" />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Hello, I'm
            </span>{" "}
            <span className="relative">
              <span className="relative z-10">Kshitij Ghode</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-accent/30 -z-10 transform -rotate-1"></span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8"
          >
            I'm a Software Engineer specializing in developing robust web applications
            and microservices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link
              href="#contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors"
            >
              View My Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="https://github.com/bobross-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kshitij-ghode-76a734171/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:kshitijghode@gmail.com"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-foreground/50" />
      </motion.div>
    </section>
  );
} 