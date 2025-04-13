"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Layout,
  Smartphone,
  Server,
  Layers,
} from "lucide-react";

const skills = [
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: ["Java", "Spring Boot", "Microservices", "Apache Kafka", "REST APIs"],
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    skills: ["PostgreSQL", "OracleDB"],
  },
  {
    category: "DevOps & Tools",
    icon: <Layers className="w-6 h-6" />,
    skills: ["Docker", "GitLab", "YAML", "Nginx", "Git", "Signoz APM", "Agile (IceScrum)"],
  },
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    skills: ["Next.js", "React", "HTML", "JavaScript"],
  },
  {
    category: "Web3 (Familiarity)",
    icon: <Code className="w-6 h-6" />,
    skills: ["Solidity", "Ethers.js", "Web3.js", "Smart Contracts"],
  },
];

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            I've worked with a variety of technologies and frameworks to create
            stunning and functional applications. Here are some of my key skills
            and areas of expertise.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-background rounded-xl p-6 shadow-md border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                    <span className="text-foreground/80">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 