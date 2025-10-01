"use client"

import React, { useState } from 'react';
import { Music, Monitor, Trophy, Palette, GraduationCap, UtensilsCrossed, Film, Theater, ChevronRight, Shield, CreditCard, ShoppingBag, Grid3x3, Ticket, ShieldCheck } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { name: 'Music', icon: Music, color: 'purple' },
    { name: 'Technology', icon: Monitor, color: 'blue' },
    { name: 'Sports', icon: Trophy, color: 'green' },
    { name: 'Art', icon: Palette, color: 'pink' },
    { name: 'Education', icon: GraduationCap, color: 'orange' },
    { name: 'Food', icon: UtensilsCrossed, color: 'red' },
    { name: 'Movies', icon: Film, color: 'purple' },
    { name: 'Theater', icon: Theater, color: 'teal' }
  ];

  const featuredEvents: Event[] = [
    {
      id: '1',
      name: 'Summer Music Festival',
      date: 'Aug 15, 2025',
      location: 'Jakarta Convention Center',
      category: 'MUSIC',
      price: 250,
      image: 'music-festival'
    },
    {
      id: '2',
      name: 'Tech Conference 2025',
      date: 'Jul 25, 2025',
      location: 'Digital Hub Bandung',
      category: 'TECHNOLOGY',
      price: 150,
      image: 'tech-conference'
    },
    {
      id: '3',
      name: 'Blockchain Workshop',
      date: 'Aug 10, 2025',
      location: 'Blockchain Center Jakarta',
      category: 'WORKSHOP',
      price: 100,
      image: 'blockchain'
    },
    {
      id: '4',
      name: 'Rock Concert: Thunder Night',
      date: 'Sep 20, 2025',
      location: 'Gelora Bung Karno Stadium',
      category: 'MUSIC',
      price: 350,
      image: 'rock-concert'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Anti-Counterfeit Protection',
      description: 'Each ticket is a unique NFT with dynamic QR codes. Fake tickets are impossible.'
    },
    {
      icon: CreditCard,
      title: 'IDRX Native Payments',
      description: 'Pay with Indonesian digital currency. We handle all the blockchain complexity automatically.'
    },
    {
      icon: ShoppingBag,
      title: 'Smart Marketplace',
      description: 'Resell tickets safely with automatic fair pricing and instant payments.'
    },
    {
      icon: Grid3x3,
      title: 'Flexible Event Options',
      description: 'Perfect for any event size. Choose Web2-friendly or full Web3 experience.'
    },
    {
      icon: Ticket,
      title: 'Complete Transparency',
      description: 'Full ticket history on Lisk blockchain. Verify authenticity instantly.'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security',
      description: 'Multi-layered protection trusted by professional organizers across Indonesia.'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sari Wijaya',
      role: 'Jakarta',
      quote: 'Buying with IDRX is simple and reselling happened instantly with fair pricing built-in.',
      avatar: '👩'
    },
    {
      name: 'Budi Santoso',
      role: 'Event Organizer',
      quote: 'The staff system and automatic royalties transformed how I manage events.',
      avatar: '👨'
    },
    {
      name: 'Maya Chen',
      role: 'Community Leader',
      quote: 'Having both Web2 and Web3 options means I can serve any audience perfectly.',
      avatar: '👩'
    },
    {
      name: 'Rizki Pratama',
      role: 'Festival Producer',
      quote: 'Burn-to-verify eliminated fraud and automatic refunds save us hours of work.',
      avatar: '👨'
    },
    {
      name: 'Rini Hartati',
      role: 'First-time User',
      quote: 'Paying with IDRX feels like any payment app, but my tickets are blockchain-secured.',
      avatar: '👩'
    },
    {
      name: 'Aditya Pratama',
      role: 'Conference Director',
      quote: 'Real-time analytics help me plan better events and grow my audience.',
      avatar: '👨'
    }
  ];

  const formatCurrency = (amount: number): string => {
    return `IDRX ${amount}`;
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'MUSIC': 'bg-purple-100 text-purple-700',
      'TECHNOLOGY': 'bg-blue-100 text-blue-700',
      'WORKSHOP': 'bg-orange-100 text-orange-700',
      'SPORTS': 'bg-green-100 text-green-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getEventGradient = (index: number): string => {
    const gradients = [
      'from-purple-400 to-pink-500',
      'from-blue-400 to-cyan-500',
      'from-orange-400 to-red-500',
      'from-green-400 to-teal-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover Events,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Secure with
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Lummy is a revolutionary NFT ticketing platform that ensures your tickets are authentic, secure, and easy to use or transfer.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                Explore Events
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition-colors">
                Browse Marketplace
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Powered by Lisk blockchain technology • 100% secure and authentic tickets
            </p>
          </div>

          {/* Right Content - Ticket Display */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-3xl p-8 shadow-2xl aspect-square flex flex-col items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>

              {/* Ticket 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-xl transform -rotate-6 mb-4 relative z-10 w-80">
                <h3 className="font-bold text-gray-900 mb-1">Summer Music Festival</h3>
                <p className="text-sm text-gray-600 mb-3">VIP Pass • NFT Secured</p>
                <div className="bg-gray-100 h-16 rounded flex items-center justify-center">
                  <div className="text-xs text-gray-500">QR</div>
                </div>
              </div>

              {/* Ticket 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-xl transform rotate-3 relative z-20 w-80">
                <h3 className="font-bold text-gray-900 mb-1">Tech Conference 2025</h3>
                <p className="text-sm text-gray-600 mb-3">Premium Access • Blockchain Verified</p>
                <div className="bg-gray-100 h-16 rounded flex items-center justify-center">
                  <div className="text-xs text-gray-500">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-20">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                    selectedCategory === category.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-${category.color}-100 flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
              View all events
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event, idx) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${getEventGradient(idx)} relative`}>
                  <img 
                    src={`https://placehold.co/400x300/6366f1/ffffff?text=${event.image}`}
                    alt={event.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{event.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{event.location}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="font-bold text-purple-600">{formatCurrency(event.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Blockchain-Powered Ticketing
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lummy transforms Indonesian event ticketing with advanced blockchain technology for every type of event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                What People Are Saying
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from event-goers and organizers who are already enjoying the benefits of blockchain tickets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 relative">
                <div className="text-4xl text-purple-200 mb-4">&apos;</div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;