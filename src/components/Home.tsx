"use client"

import React, { useState } from 'react';
import { Music, Monitor, Trophy, Palette, GraduationCap, UtensilsCrossed, Film, Theater, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  price: number;
  image: string;
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

  const formatCurrency = (amount: number): string => {
    return `IDRX ${amount}`;
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'MUSIC': 'bg-purple-900 text-purple-300',
      'TECHNOLOGY': 'bg-blue-900 text-blue-300',
      'WORKSHOP': 'bg-orange-900 text-orange-300',
      'SPORTS': 'bg-green-900 text-green-300'
    };
    return colors[category] || 'bg-gray-800 text-gray-300';
  };

  const getEventGradient = (index: number): string => {
    const gradients = [
      'from-purple-600 to-pink-600',
      'from-blue-600 to-cyan-600',
      'from-orange-600 to-red-600',
      'from-green-600 to-teal-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Events,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Secure with
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Lummy is a revolutionary NFT ticketing platform that ensures your tickets are authentic, secure, and easy to use or transfer.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                Explore Events
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-400 hover:bg-purple-950 font-semibold rounded-lg transition-colors">
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
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl transform -rotate-6 mb-4 relative z-10 w-80">
                <h3 className="font-bold text-gray-100 mb-1">Summer Music Festival</h3>
                <p className="text-sm text-gray-400 mb-3">VIP Pass • NFT Secured</p>
                <div className="bg-gray-700 h-16 rounded flex items-center justify-center">
                  <div className="text-xs text-gray-400">QR</div>
                </div>
              </div>

              {/* Ticket 2 */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl transform rotate-3 relative z-20 w-80">
                <h3 className="font-bold text-gray-100 mb-1">Tech Conference 2025</h3>
                <p className="text-sm text-gray-400 mb-3">Premium Access • Blockchain Verified</p>
                <div className="bg-gray-700 h-16 rounded flex items-center justify-center">
                  <div className="text-xs text-gray-400">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                    selectedCategory === category.name
                      ? 'border-purple-500 bg-purple-950'
                      : 'border-gray-800 hover:border-gray-700 bg-gray-900'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-${category.color}-950 flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 text-${category.color}-400`} />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-100">Featured Events</h2>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold">
              View all events
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event, idx) => (
              <div key={event.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:shadow-2xl hover:shadow-purple-900/20 transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${getEventGradient(idx)} relative`}>
                  <img 
                    src={`https://placehold.co/400x300/6366f1/ffffff?text=${event.image}`}
                    alt={event.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-400 mb-2">{event.date}</p>
                  <h3 className="font-bold text-gray-100 text-lg mb-2">{event.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{event.location}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="font-bold text-purple-400">{formatCurrency(event.price)}</span>
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