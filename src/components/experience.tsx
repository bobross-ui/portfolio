"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Software Engineer",
    company: "Profinch Solutions",
    period: "Sep 2021 - Apr 2024",
    description:
      "Developed the backend for Atumverse Studio Microservice, a low-code application for banks to create web-screens for banking websites. Implemented custom request and response models to standardize data exchange across the service layer. Implemented Signoz APM in multiple microservices and created dashboards based on business requirements. Deployed environment software's Camunda, Solr, Postgresql and nginx using yaml.",
    type: "work",
  },
  {
    title: "B.Tech, Production Engineering",
    company: "National Institute of Technology, Trichy",
    period: "2017 - 2021",
    description:
      "Completed Bachelor of Technology degree in Production Engineering from one of India's premier technical institutions.",
    type: "education",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My professional journey and educational background that have shaped
            my skills and expertise in web development and design.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative mb-12 md:mb-8 md:w-1/2",
                index % 2 === 0
                  ? "md:pr-12 md:ml-auto"
                  : "md:pl-12 md:mr-auto"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary",
                  index % 2 === 0
                    ? "right-0 md:-right-4 transform md:translate-x-px"
                    : "left-0 md:-left-4 transform md:translate-x-px"
                )}
              >
                {exp.type === "work" ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
              </div>

              <div
                className={cn(
                  "ml-12 md:ml-0 p-6 bg-background rounded-lg shadow-md border border-border/50 hover:border-primary/30 transition-colors",
                  index % 2 === 0 ? "" : ""
                )}
              >
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium mb-2",
                    exp.type === "work"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent-foreground"
                  )}
                >
                  {exp.period}
                </span>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-foreground/70 font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-foreground/80">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 