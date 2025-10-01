'use client';

import { useState } from 'react';

// Types
interface TicketListItem {
  id: string;
  type: string;
  status: 'active' | 'used' | 'refunded';
  eventName: string;
  date: string;
  location: string;
  image?: string;
}

interface TicketDetails {
  id: string;
  eventName: string;
  type: string;
  location: string;
  tokenId: string;
  originalPrice: number;
  date: string;
  time: string;
  owner: string;
  purchaseDate: string;
  image?: string;
}

// Sample Tickets Data
const ticketsData: TicketListItem[] = [
  {
    id: '1',
    type: 'VIP Pass',
    status: 'active',
    eventName: 'Summer Music Festival',
    date: 'Sun, Jun 15, 2025',
    location: 'Jakarta Convention Center',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300'
  },
  {
    id: '2',
    type: 'Premium Access',
    status: 'active',
    eventName: 'Tech Conference 2025',
    date: 'Fri, Jul 25, 2025',
    location: 'Digital Hub Bandung',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300'
  },
  {
    id: '3',
    type: 'Workshop Ticket',
    status: 'used',
    eventName: 'Blockchain Workshop',
    date: 'Sat, May 10, 2025',
    location: 'Blockchain Center Jakarta'
  },
  {
    id: '4',
    type: 'Standard Entry',
    status: 'refunded',
    eventName: 'Art Exhibition: Future Visions',
    date: 'Thu, Jun 5, 2025',
    location: 'Modern Gallery Surabaya'
  }
];

type TabType = 'all' | 'active' | 'used' | 'refunded';
// Sample Ticket Data
const sampleTickets: TicketDetails[] = [
  {
    id: '1',
    eventName: 'Summer Music Festival',
    type: 'VIP Pass',
    location: 'Jakarta Convention Center',
    tokenId: 'NFT-12345678',
    originalPrice: 500,
    date: 'Sunday, June 15, 2025',
    time: '12:00 PM',
    owner: '0x1234...5678',
    purchaseDate: 'Saturday, March 15, 2025',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500'
  },
  {
    id: '2',
    eventName: 'Tech Conference 2025',
    type: 'VIP Pass',
    location: 'Digital Hub Bandung',
    tokenId: 'NFT-12345678',
    originalPrice: 500,
    date: 'Sunday, June 15, 2025',
    time: '12:00 PM',
    owner: '0x1234...5678',
    purchaseDate: 'Saturday, March 15, 2025',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500'
  }
];
const sampleTicket: TicketDetails = sampleTickets[0];

export default function TicketModals() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showResellModal, setShowResellModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketDetails | null>(null);
  const [resellPrice, setResellPrice] = useState(495);
  const [recipientAddress, setRecipientAddress] = useState('');

  // Calculate resell percentage
  const activeTicket = selectedTicket ?? sampleTicket;
  const resellPercentage = Math.round((resellPrice / activeTicket.originalPrice) * 100);
  const organizerFee = (resellPrice * 2.5) / 100;
  const platformFee = (resellPrice * 3) / 100;
  const youReceive = resellPrice - organizerFee - platformFee;

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tickets based on active tab and search query
  const filteredTickets = ticketsData.filter(ticket => {
    const matchesTab = activeTab === 'all' || ticket.status === activeTab;
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get status badge color
  const getStatusColor = (status: 'active' | 'used' | 'refunded') => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'used':
        return 'bg-gray-500';
      case 'refunded':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get ticket type color
  const getTicketTypeColor = (status: 'active' | 'used' | 'refunded') => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'used':
        return 'bg-gradient-to-r from-purple-600 to-purple-700';
      case 'refunded':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Demo Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tickets</h1>
            <p className="text-gray-600">Demo tickets (connect wallet for real NFTs)</p>
          </div>

          {/* Search Bar */}
          <div className="w-80">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'all'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'active'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            🎫 Active
          </button>
          <button
            onClick={() => setActiveTab('used')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'used'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Used
          </button>
          <button
            onClick={() => setActiveTab('refunded')}
            className={`pb-3 px-2 font-medium transition-colors ${
              activeTab === 'refunded'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Refunded
          </button>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {/* Ticket Header */}
              <div className={`${getTicketTypeColor(ticket.status)} px-4 py-3 flex justify-between items-center`}>
                <div className="flex items-center gap-2 text-white">
                  <span>🎫</span>
                  <span className="font-semibold">{ticket.type}</span>
                </div>
                <span className={`${getStatusColor(ticket.status)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                  {ticket.status}
                </span>
              </div>

              {/* Ticket Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ticket.eventName}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span>
                    <span className="text-sm">{ticket.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📍</span>
                    <span className="text-sm">{ticket.location}</span>
                  </div>
                </div>

                {/* Ticket Image/Status Display */}
                <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  {ticket.status === 'active' && ticket.image ? (
                    <img 
                      src={ticket.image} 
                      alt={ticket.eventName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center bg-gray-700 text-white">
                      <span className="text-4xl mb-2">ℹ️</span>
                      <span className="text-lg font-semibold capitalize">{ticket.status}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button onClick={() => { const found = sampleTickets.find(t => t.id === ticket.id) || null; setSelectedTicket(found); setShowDetailsModal(!!found); }} className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center justify-center gap-2">
                    <span>ℹ️</span>
                    <span>Ticket Details</span>
                  </button>
                  
                  {ticket.status === 'active' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => { const found = sampleTickets.find(t => t.id === ticket.id) || null; setSelectedTicket(found); setShowTransferModal(!!found); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                        <span>↔️</span>
                        <span>Transfer</span>
                      </button>
                      <button onClick={() => { const found = sampleTickets.find(t => t.id === ticket.id) || null; setSelectedTicket(found); setShowResellModal(!!found); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2">
                        <span>🏷️</span>
                        <span>Resell</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tickets found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'You don\'t have any tickets in this category yet'}
            </p>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {showDetailsModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Ticket Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Ticket Header */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span>🎫</span>
                    <span className="font-semibold">Ticket Details</span>
                  </div>
                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-bold">
                    VALID
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{selectedTicket.eventName}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Event Information */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Event Information</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-gray-400">📅</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Date</p>
                        <p className="text-gray-900">{selectedTicket.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-gray-400">🕐</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Time</p>
                        <p className="text-gray-900">{selectedTicket.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-gray-400">📍</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Location</p>
                        <p className="text-gray-900">{selectedTicket.location}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-4 mt-6">Ticket Information</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-gray-400">🎟️</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Type</p>
                        <p className="text-gray-900">{selectedTicket.type}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-gray-400">👤</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Owner</p>
                        <p className="text-gray-900 font-mono text-sm">{selectedTicket.owner}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-gray-400">🔗</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Token ID</p>
                        <p className="text-gray-900 font-mono text-sm">{selectedTicket.tokenId}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-gray-400">🕐</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Purchase Date</p>
                        <p className="text-gray-900">{selectedTicket.purchaseDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - QR Code */}
                <div>
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800 text-center font-medium">
                      🎫 Show this QR to event staff for check-in
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">⬛</div>
                          <p className="text-xs text-gray-500">QR Code</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className="text-xs font-semibold text-gray-700">Ticket QR Code</p>
                      <p className="text-xs text-gray-500 font-mono">ticket-1...et-1</p>
                      <p className="text-xs text-gray-500">Staff Scanner - Event event-1</p>
                      <a href="#" className="text-xs text-blue-600 hover:underline block">
                        URL: https://lummy-ticket.vercel.app/staff/event/event-1/scanner/1
                      </a>
                      <p className="text-xs font-mono text-gray-700">Token ID: {selectedTicket.tokenId}</p>
                      <p className="text-xs text-orange-600 flex items-center justify-center gap-1">
                        <span>🔒</span>
                        For security: Do not share or screenshot this QR code
                      </p>
                      <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <span>✅</span>
                        Staff-only scanner • Secure blockchain verification
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 space-y-3">
                <button className="w-full px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium flex items-center justify-center gap-2">
                  <span>🔗</span>
                  View Public NFT Page
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowTransferModal(true);
                    }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                  >
                    <span>↔️</span>
                    Transfer
                  </button>
                  <button 
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowResellModal(true);
                    }}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center justify-center gap-2"
                  >
                    <span>🏷️</span>
                    Resell
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    This ticket is an NFT on the Lisk blockchain, ensuring authenticity and preventing counterfeiting. 
                    You can view full transaction history on the blockchain explorer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Transfer Ticket</h2>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Ticket Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{selectedTicket.eventName}</h3>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold">
                    NOT OWNED
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {selectedTicket.type} • {selectedTicket.location}
                </p>
                <p className="text-xs text-gray-500 mb-2">Token ID: {selectedTicket.tokenId}</p>
                <p className="text-sm font-semibold text-green-600">
                  Original Price: {selectedTicket.originalPrice} IDRX
                </p>
              </div>

              {/* Warning */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-orange-600 text-xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-orange-900 mb-2">
                      Important: Transfer is permanent and irreversible
                    </p>
                    <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                      <li>The NFT will be removed from your wallet</li>
                      <li>Recipient gains full ownership and transfer rights</li>
                      <li>Enhanced metadata (event name, venue, tier) will be preserved</li>
                      <li>Transfer count will be incremented in the NFT</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Wallet Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x123456789012345678901234567890123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  disabled={!recipientAddress}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Ownership Verification Required
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resell Modal */}
      {showResellModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Resell Ticket</h2>
              <button
                onClick={() => setShowResellModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Ticket Info */}
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded text-xs font-bold">
                      VIP PASS
                    </span>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs font-bold">
                      ORIGINAL: 500 IDRX
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{selectedTicket.eventName}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span>📍</span>
                    {selectedTicket.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Token ID: {selectedTicket.tokenId}</p>
                </div>
              </div>

              {/* Marketplace Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-blue-600 text-xl">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Marketplace Listing Terms</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Your NFT will be transferred to marketplace escrow</li>
                      <li>• You can cancel listing anytime before purchase</li>
                      <li>• Enhanced metadata (event, venue, tier) preserved for buyer</li>
                      <li>• Organizer & platform fees deducted automatically</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Set Resale Price */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Set Resale Price</h4>
                <p className="text-sm text-gray-600 mb-3">Original price: IDRX 500</p>
                
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (IDRX)
                </label>
                <input
                  type="number"
                  value={resellPrice}
                  onChange={(e) => setResellPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg font-semibold"
                />
                
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-600">Percentage of original price: {resellPercentage}%</p>
                  {resellPercentage < 100 ? (
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded text-xs font-bold">
                      Original
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs font-bold">
                      Markup
                    </span>
                  )}
                </div>

                {/* Price Slider Visual */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600"
                      style={{ width: `${Math.min(resellPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-600 text-xl">💰</span>
                  <h4 className="font-bold text-gray-900">Fee Breakdown</h4>
                  <span className="ml-auto text-sm text-gray-600">-0.003 LSK</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listing Price:</span>
                    <span className="font-semibold text-gray-900">{resellPrice.toFixed(2)} IDRX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Organizer Fee (2.5%):</span>
                    <span className="font-semibold text-red-600">-{organizerFee.toFixed(2)} IDRX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee (3%):</span>
                    <span className="font-semibold text-red-600">-{platformFee.toFixed(2)} IDRX</span>
                  </div>
                  <div className="border-t border-yellow-300 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">You&apos;ll Receive:</span>
                    <span className="font-bold text-green-600">{youReceive.toFixed(2)} IDRX</span>
                  </div>
                </div>
              </div>

              {/* Organizer Resale Rules */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-blue-600 text-xl">📋</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Organizer Resale Rules</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Max markup: 20% above original price</li>
                      <li>• Organizer fee: 2.5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Marketplace Preview */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <span>🔍</span>
                    Marketplace Preview
                  </h4>
                  <button className="text-purple-600 text-sm hover:underline flex items-center gap-1">
                    <span>👁️</span>
                    Hide
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing Price:</span>
                      <span className="font-semibold text-gray-900">{resellPrice.toFixed(2)} IDRX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Organizer Fee (2.5%):</span>
                      <span className="font-semibold text-red-600">-{organizerFee.toFixed(2)} IDRX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee (3%):</span>
                      <span className="font-semibold text-red-600">-{platformFee.toFixed(2)} IDRX</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-bold text-gray-900">You&apos;ll Receive:</span>
                      <span className="font-bold text-green-600">{youReceive.toFixed(2)} IDRX</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 mb-1">{selectedTicket.eventName}</h5>
                        <div className="flex gap-2 mb-1">
                          <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs font-bold">
                            VIP PASS
                          </span>
                          <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-bold">
                            RESALE
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Original: 500 IDRX</p>
                        <p className="text-lg font-bold text-green-600">{resellPrice.toFixed(2)} IDRX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizer Rules (Bottom) */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-blue-600 text-xl">📋</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Organizer Resale Rules</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Max markup: 20% above original price</li>
                      <li>• Organizer fee: 2.5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResellModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  List for Resale
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}