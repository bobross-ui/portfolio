"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0"
          >
            Kshitij Ghode
          </Link>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/bobross-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent/10 text-foreground/70 hover:text-primary hover:bg-accent/20 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/kshitij-ghode-76a734171/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent/10 text-foreground/70 hover:text-primary hover:bg-accent/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <ThemeToggle className="p-2 rounded-full bg-accent/10 text-foreground/70 hover:text-primary hover:bg-accent/20" />
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-foreground/70">
                A dedicated and skilled Software Engineer with a proven track record of developing robust web
                applications and microservices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Skills</h3>
              <ul className="space-y-2">
                <li className="text-foreground/70">Java & Spring Boot</li>
                <li className="text-foreground/70">REST APIs</li>
                <li className="text-foreground/70">PostgreSQL & OracleDB</li>
                <li className="text-foreground/70">Docker</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-foreground/70">kshitijghode@gmail.com</li>
                <li className="text-foreground/70">+91 8425969570</li>
                <li className="text-foreground/70">
                  Mumbai, India
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-foreground/70 flex items-center justify-center">
            © {currentYear} Kshitij Ghode. All rights reserved. Made with{" "}
            <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js and
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
} 