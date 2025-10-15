# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a kinesiotherapy application built with Next.js 15.5.5, React 19.1.0, TypeScript, and Tailwind CSS 4. It's a proof-of-concept (POC) project for kinesiotherapy-related functionality, using the modern Next.js App Router architecture.

## Development Commands

### Core Development
```bash
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build production application
npm run start       # Start production server
```

### Package Management
- Uses npm (package-lock.json present)
- No alternative package managers configured

### Testing & Quality
- No testing framework currently configured
- No linting/formatting tools currently configured
- No pre-commit hooks configured

## Architecture Overview

### Framework & Stack
- **Next.js 15.5.5** with App Router architecture
- **React 19.1.0** with TypeScript strict mode
- **Tailwind CSS 4** with PostCSS configuration
- **Geist fonts** (sans and mono) via next/font/google

### Project Structure
```
/
├── app/                 # App Router directory (Next.js 13+ pattern)
│   ├── layout.tsx       # Root layout with fonts and global styles
│   ├── page.tsx         # Homepage component
│   ├── globals.css      # Global styles with Tailwind
│   └── favicon.ico      # Site favicon
├── public/              # Static assets (SVG icons for Next.js template)
├── next.config.ts       # Next.js configuration (minimal setup)
├── tsconfig.json        # TypeScript configuration with strict mode
├── postcss.config.mjs   # PostCSS config for Tailwind CSS 4
└── package.json         # Dependencies and scripts
```

### Key Configuration Details
- **TypeScript**: ES2017 target with strict mode enabled
- **Path aliases**: `@/*` maps to project root (`./*`)
- **Tailwind**: Using v4 with PostCSS integration
- **Next.js**: Minimal configuration, default settings
- **Fonts**: Geist Sans and Geist Mono loaded via next/font/google

### Current State
This appears to be a fresh Next.js project created with `create-next-app` that has been customized for the kinesiotherapy domain. The codebase currently contains:
- Default Next.js template structure
- Basic Tailwind CSS styling
- TypeScript configuration
- No custom business logic yet implemented
- No API routes or database integration

## Development Guidelines

### File Organization
- Use the `app/` directory for all routes and pages (App Router pattern)
- Place shared components in `app/components/` when created
- Use TypeScript for all new files (`.tsx` for React components, `.ts` for utilities)
- Static assets go in `public/` directory

### Styling
- Tailwind CSS 4 is configured and ready to use
- Global styles are in `app/globals.css`
- Geist fonts are pre-configured and available via CSS variables

### TypeScript
- Strict mode is enabled
- Use the `@/*` path alias for imports from project root
- All React components should be properly typed

### Next.js Patterns
- Use App Router conventions (not Pages Router)
- Server Components by default, use `'use client'` directive when needed
- Leverage Next.js Image component for optimized images