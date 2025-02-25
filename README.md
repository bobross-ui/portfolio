# Artistic Portfolio Website

A modern, artistic, and eye-catching portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Artistic Design**: Beautiful animations, gradients, and interactive elements
- 🌓 **Dark/Light Mode**: Seamless theme switching with system preference detection
- 📱 **Fully Responsive**: Looks great on all devices, from mobile to desktop
- ⚡ **Performance Optimized**: Fast loading times and smooth animations
- 🧩 **Modular Components**: Easy to customize and extend
- 🔄 **Interactive Elements**: Hover effects, animations, and more
- 📊 **Skills Showcase**: Visual representation of your skills and expertise
- 📝 **Project Gallery**: Showcase your work with filterable categories
- 📜 **Experience Timeline**: Chronological display of your professional journey
- 📬 **Contact Form**: Easy way for visitors to get in touch

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Personal Information

Edit the following files to customize your personal information:

- `src/components/hero.tsx`: Update your name, title, and social links
- `src/components/about.tsx`: Update your bio and background information
- `src/components/skills.tsx`: Update your skills and expertise
- `src/components/projects.tsx`: Add your own projects
- `src/components/experience.tsx`: Update your work and education history
- `src/components/contact.tsx`: Update your contact information
- `src/components/footer.tsx`: Update footer information and links

### Images

Replace the placeholder images with your own:

- Add your profile photo to `public/` and update the reference in `src/components/about.tsx`
- Add project images to `public/` and update the references in `src/components/projects.tsx`
- Add your resume PDF to `public/resume.pdf`

### Colors and Theme

Customize the colors and theme by editing:

- `src/app/globals.css`: Update the CSS variables for colors
- `tailwind.config.ts`: Customize the Tailwind configuration

## Deployment

This portfolio can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio)

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern portfolio design trends
- Thanks to the creators of the libraries and tools used in this project
