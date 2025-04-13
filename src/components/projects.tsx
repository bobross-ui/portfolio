"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    title: "Atumverse Studio Microservice",
    description:
      "Developed the backend for a low-code application that enables banks to create web-screens for their banking websites. Implemented custom request and response models to standardize data exchange across the service layer.",
    image: "/placeholder.jpg",
    tags: ["Java", "Spring Boot", "REST APIs", "Microservices"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "Backend Development",
  },
  {
    title: "Application Performance Monitoring",
    description:
      "Implemented Signoz APM in multiple microservices to monitor application performance. Created dashboards based on business requirements and improved software efficiency by detecting bottlenecks.",
    image: "/placeholder.jpg",
    tags: ["Signoz", "APM", "Monitoring", "Performance Optimization"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "DevOps",
  },
  {
    title: "Client Server Deployment",
    description:
      "Deployed environment software including Camunda, Solr, PostgreSQL, and Nginx using YAML configurations. Installed microservices using Docker and created and deployed FTLs based on client requirements.",
    image: "/placeholder.jpg",
    tags: ["Docker", "YAML", "Camunda", "Solr", "PostgreSQL", "Nginx"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "DevOps",
  },
  {
    title: "Spotify to YouTube Playlist Transfer",
    description:
      "Automated playlist migration using Python, Spotify API, and YouTube API.",
    image: "/placeholder.jpg",
    tags: ["Python", "Spotify API", "YouTube API"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "Personal Project",
  },
  {
    title: "Email-AI Replier Chrome Extension",
    description:
      "AI-powered Gmail auto-reply tool using Gemini LLM API and JavaScript.",
    image: "/placeholder.jpg",
    tags: ["JavaScript", "Chrome Extension", "Gemini API"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "Personal Project",
  },
  {
    title: "Ethereum Whale Tracker (Web3)",
    description:
      "Real-time Ethereum large transaction monitoring using Ethers.js, Next.js.",
    image: "/placeholder.jpg",
    tags: ["Web3", "Ethers.js", "Next.js"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "Personal Project",
  },
  {
    title: "Pump.fun Clone (Web3 Concept)",
    description:
      "Ethereum token launch platform prototype (Solidity, Ethers.js)",
    image: "/placeholder.jpg",
    tags: ["Web3", "Solidity", "Ethers.js"],
    // liveUrl: "#",
    // githubUrl: "#",
    category: "Personal Project",
  },
];

const categories = [
  "All",
  "Backend Development",
  "DevOps",
  "Personal Project",
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project is a unique piece
            of development that showcases my skills and passion for building
            exceptional digital experiences.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl overflow-hidden shadow-md border border-border/50 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-gradient-x" />
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 transition-opacity duration-300",
                    hoveredIndex === index ? "opacity-90" : ""
                  )}
                >
                  {/* <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background rounded-full text-primary hover:bg-background/90 transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background rounded-full text-primary hover:bg-background/90 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-accent/10 rounded-full text-sm text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 