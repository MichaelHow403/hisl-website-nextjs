'use client';
import React from 'react';

// Base skeleton component with HISL industrial theme
export function Skeleton({ 
  className = "", 
  variant = "default" 
}: { 
  className?: string;
  variant?: "default" | "text" | "circular" | "rectangular";
}) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-slate-800/50 to-slate-700/50";
  
  const variantClasses = {
    default: "rounded-lg",
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-xl"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

// Industrial-themed loading spinner
export function IndustrialSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-amber-400/10 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

// Globe loading state
export function GlobeLoading() {
  return (
    <div className="flex justify-center">
      <div className="relative w-96 h-96">
        {/* Backdrop skeleton */}
        <Skeleton className="absolute inset-0 rounded-full" variant="circular" />
        
        {/* Main globe skeleton */}
        <div className="relative rounded-full border-2 border-amber-400/30 bg-slate-800/60 backdrop-blur-sm overflow-hidden">
          <Skeleton className="w-full h-full rounded-full" />
          
          {/* Loading animation overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/10 to-transparent animate-pulse rounded-full"></div>
        </div>
        
        {/* Orbital loading indicators */}
        <div className="absolute inset-0">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <IndustrialSpinner size="sm" />
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <IndustrialSpinner size="sm" />
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-amber-400/20 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-300 text-sm font-medium">LOADING GLOBAL NETWORK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Command interface loading state
export function AICommandLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" variant="text" />
        <Skeleton className="h-4 w-96" variant="text" />
      </div>
      
      <div className="space-y-6">
        <div>
          <Skeleton className="h-4 w-32 mb-3" variant="text" />
          <Skeleton className="w-full h-36 rounded-xl" />
        </div>
        
        <div className="flex items-center justify-center p-4 bg-slate-950/80 border border-amber-400/30 rounded-xl">
          <IndustrialSpinner size="md" />
          <span className="ml-3 text-amber-300 font-medium">INITIALIZING AI INTERFACE</span>
        </div>
      </div>
    </div>
  );
}

// Solution cards loading skeleton
export function SolutionsLoading() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8"
        >
          <div className="text-center mb-6">
            <Skeleton className="w-16 h-16 mx-auto mb-4" variant="circular" />
            <Skeleton className="h-6 w-48 mx-auto mb-2" variant="text" />
            <Skeleton className="h-4 w-64 mx-auto mb-4" variant="text" />
          </div>
          
          <Skeleton className="h-4 w-full mb-2" variant="text" />
          <Skeleton className="h-4 w-5/6 mb-2" variant="text" />
          <Skeleton className="h-4 w-4/5 mb-6" variant="text" />
          
          {/* Metrics highlight skeleton */}
          <div className="bg-emerald-600/10 border border-emerald-400/20 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Skeleton className="w-2 h-2" variant="circular" />
              <Skeleton className="h-3 w-24" variant="text" />
            </div>
            <Skeleton className="h-5 w-32" variant="text" />
          </div>
          
          <Skeleton className="w-full h-10 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

// Navigation loading state
export function NavigationLoading() {
  return (
    <nav className="hidden md:flex space-x-8">
      {[1, 2, 3, 4].map((index) => (
        <Skeleton key={index} className="h-6 w-20" variant="text" />
      ))}
    </nav>
  );
}

// BIOS section loading
export function BiosLoading() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {[1, 2].map((index) => (
        <div key={index} className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-lg p-8">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="w-32 h-32 mb-6" variant="circular" />
            <Skeleton className="h-6 w-40 mb-2" variant="text" />
            <Skeleton className="h-4 w-56 mb-4" variant="text" />
            
            <div className="w-full space-y-2 mb-4">
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-4 w-5/6" variant="text" />
              <Skeleton className="h-4 w-4/5" variant="text" />
              <Skeleton className="h-4 w-3/4" variant="text" />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-8 w-24 rounded" />
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Page loading wrapper
export function PageLoading({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-amber-50 font-sans relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        </div>
        
        {/* Header skeleton */}
        <header className="relative border-b border-amber-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-amber-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-3 h-3" variant="circular" />
                <div>
                  <Skeleton className="h-8 w-16 mb-1" variant="text" />
                  <Skeleton className="h-3 w-32" variant="text" />
                </div>
              </div>
              <NavigationLoading />
            </div>
          </div>
        </header>

        {/* Content loading */}
        <main className="relative py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <IndustrialSpinner size="lg" />
            <div className="mt-8">
              <div className="inline-flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-xl px-6 py-3">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-300 font-semibold text-lg tracking-wide">INITIALIZING HISL SYSTEMS</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}

// System status loading indicator
export function SystemStatusLoading() {
  return (
    <div className="inline-flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-xl px-6 py-3 mb-8 shadow-lg shadow-amber-900/20">
      <IndustrialSpinner size="sm" />
      <span className="text-amber-300 font-semibold text-lg tracking-wide">SYSTEM INITIALIZING</span>
    </div>
  );
}

// Results metrics loading
export function MetricsLoading() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {[1, 2, 3].map((index) => (
        <div key={index} className="text-center bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8">
          <Skeleton className="h-12 w-20 mx-auto mb-2" variant="text" />
          <Skeleton className="h-6 w-32 mx-auto mb-2" variant="text" />
          <Skeleton className="h-4 w-40 mx-auto" variant="text" />
        </div>
      ))}
    </div>
  );
}
