"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="py-20 bg-accent/5 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden border-4 border-background shadow-xl">
              {/* Your profile image */}
              <Image 
                src="/myPhoto.png" 
                alt="Kshitij Ghode" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-gradient-x mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              I'm <span className="text-primary">Kshitij Ghode</span>, a Software Engineer
            </h3>
            <p className="text-foreground/80 mb-6">
              I'm a Software Engineer with experience in developing and maintaining backend microservices, implementing API gateways, and orchestrating workflows using tools like Java, Spring Boot, and Kafka.
            </p>
            <p className="text-foreground/80 mb-6">
              I have hands-on experience with DevOps practices, including containerization with Docker, CI/CD with GitLab, and monitoring with Signoz. I'm also familiar with frontend technologies like Next.js and React, and have explored Web3 concepts.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-background rounded-lg px-4 py-2 shadow-sm">
                <span className="text-primary font-bold">2+</span> Years Experience
              </div>
              <div className="bg-background rounded-lg px-4 py-2 shadow-sm">
                <span className="text-primary font-bold">B.Tech</span> NIT Trichy
              </div>
              <div className="bg-background rounded-lg px-4 py-2 shadow-sm">
                <span className="text-primary font-bold">Full Stack</span> Expertise
              </div>
            </div>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={18} /> Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 