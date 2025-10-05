"use client"

import React, { useState } from 'react';
import { Search, RefreshCw, X, Ticket, ShoppingCart } from 'lucide-react';

interface TicketListing {
  id: string;
  eventName: string;
  eventType: string;
  location: string;
  date: string;
  seller: string;
  price: number;
  originalPrice: number;
  quantity: number;
  verified: boolean;
  image: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortBy, setSortBy] = useState('Newest Listings');
  const [showAllTickets, setShowAllTickets] = useState(false);

  // Sample ticket data
  const allTickets: TicketListing[] = [
    {
      id: '1',
      eventName: 'Tech Conference 2025',
      eventType: 'Conference',
      location: 'Jakarta',
      date: '2025-03-15',
      seller: '0x1234...5678',
      price: 500000,
      originalPrice: 600000,
      quantity: 2,
      verified: true,
      image: 'conference'
    },
    {
      id: '2',
      eventName: 'Summer Music Festival',
      eventType: 'Concert',
      location: 'Bali',
      date: '2025-04-20',
      seller: '0xabcd...efgh',
      price: 750000,
      originalPrice: 850000,
      quantity: 1,
      verified: true,
      image: 'concert'
    },
    {
      id: '3',
      eventName: 'Blockchain Workshop',
      eventType: 'Workshop',
      location: 'Bandung',
      date: '2025-02-10',
      seller: '0x9876...5432',
      price: 150000,
      originalPrice: 200000,
      quantity: 5,
      verified: true,
      image: 'workshop'
    },
    {
      id: '4',
      eventName: 'Art Exhibition Opening',
      eventType: 'Exhibition',
      location: 'Yogyakarta',
      date: '2025-03-25',
      seller: '0xdef1...2345',
      price: 100000,
      originalPrice: 150000,
      quantity: 3,
      verified: true,
      image: 'exhibition'
    }
  ];

  const categories = ['All Categories', 'Workshop', 'Conference', 'Concert', 'Exhibition', 'Sports', 'Theater'];
  const locations = ['All Locations', 'Jakarta', 'Bali', 'Bandung', 'Yogyakarta', 'Surabaya'];
  const sortOptions = ['Newest Listings', 'Price: Low to High', 'Price: High to Low', 'Date: Soonest'];

  const filterTickets = (): TicketListing[] => {
    if (showAllTickets) {
      return allTickets;
    }

    let filtered = allTickets;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(ticket => 
        ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(ticket => ticket.eventType === selectedCategory);
    }

    // Filter by location
    if (selectedLocation && selectedLocation !== 'All Locations') {
      filtered = filtered.filter(ticket => ticket.location === selectedLocation);
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(ticket => ticket.date === selectedDate);
    }

    // Sort tickets
    switch (sortBy) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Date: Soonest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      default:
        // Newest Listings (default order)
        break;
    }

    return filtered;
  };

  const filteredTickets = filterTickets();

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedDate('');
    setSortBy('Newest Listings');
    setShowAllTickets(false);
  };

  const handleRefresh = () => {
    console.log('Refreshing ticket listings...');
    // In real app, this would fetch fresh data from blockchain
  };

  const formatCurrency = (amount: number): string => {
    return `IDR ${amount.toLocaleString('id-ID')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTicketIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      'Workshop': '📚',
      'Conference': '🎯',
      'Concert': '🎵',
      'Exhibition': '🎨',
      'Sports': '⚽',
      'Theater': '🎭'
    };
    return icons[type] || '🎫';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">NFT Ticket Marketplace</h1>
              <p className="text-gray-400 mt-2">Buy verified resale tickets for upcoming events. All transactions secured on the blockchain.</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-purple-700 text-purple-400 rounded-lg hover:bg-purple-950 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, categories, or locations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none cursor-pointer"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="mm/dd/yyyy"
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredTickets.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
              <Ticket className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No resale tickets found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or check back later</p>
            <button
              onClick={() => setShowAllTickets(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Show All Tickets
            </button>
          </div>
        ) : (
          /* Ticket Listings */
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing <span className="font-semibold text-gray-200">{filteredTickets.length}</span> available tickets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:shadow-purple-900/20 transition-shadow">
                  {/* Ticket Image */}
                  <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-6xl">{getTicketIcon(ticket.eventType)}</span>
                  </div>

                  {/* Ticket Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-100 text-lg mb-1">{ticket.eventName}</h3>
                        <p className="text-sm text-gray-400">{ticket.eventType}</p>
                      </div>
                      {ticket.verified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300">
                          ✓ Verified
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-2">📍</span>
                        {ticket.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-2">📅</span>
                        {formatDate(ticket.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-2">👤</span>
                        Seller: <span className="font-mono ml-1">{ticket.seller}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-gray-500 line-through">{formatCurrency(ticket.originalPrice)}</p>
                          <p className="text-2xl font-bold text-purple-400">{formatCurrency(ticket.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Available</p>
                          <p className="text-lg font-bold text-gray-200">{ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Buy Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;