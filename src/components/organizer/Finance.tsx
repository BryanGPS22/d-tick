"use client"

import React, { useState } from 'react';
import { TrendingUp, Wallet, CreditCard, ArrowDownToLine, Download, AlertCircle } from 'lucide-react';

// Types
interface Transaction {
  id: string;
  type: 'Revenue' | 'Withdrawal' | 'Escrow' | 'Escrow_release';
  description: string;
  date: string;
  amount: number;
  fee: number;
  netAmount: number;
  transactionHash: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  status: 'COMPLETED' | 'ONGOING';
  grossRevenue: number;
  platformFee: number;
  netRevenue: number;
  escrowAmount?: number;
  escrowReleaseDate?: string;
}

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'event' | 'transaction' | 'withdraw'>('event');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All Time');
  const [selectedEventFilter, setSelectedEventFilter] = useState('All Events');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  // Mock Data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'Revenue',
      description: 'Ticket sales - Summer Music Festival (Diamond Pattern + Escrow)',
      date: '6/15/2025',
      amount: 22500,
      fee: 225,
      netAmount: 22275,
      transactionHash: '0x1a2b3c'
    },
    {
      id: '2',
      type: 'Withdrawal',
      description: 'Withdrawal to wallet (Post-Escrow Release)',
      date: '6/16/2025',
      amount: 22000,
      fee: 0,
      netAmount: 22000,
      transactionHash: '0x2b3c4d'
    },
    {
      id: '3',
      type: 'Escrow',
      description: 'Escrow deposit - Tech Conference 2025 (Diamond Pattern)',
      date: '7/25/2025',
      amount: 42000,
      fee: 420,
      netAmount: 41580,
      transactionHash: '0x5e6f7a'
    },
    {
      id: '4',
      type: 'Escrow',
      description: 'Escrow deposit - Blockchain Workshop (Diamond Pattern)',
      date: '8/10/2025',
      amount: 7500,
      fee: 75,
      netAmount: 7425,
      transactionHash: '0x9a8b7c'
    },
    {
      id: '5',
      type: 'Escrow_release',
      description: 'Escrow release - Blockchain Workshop (Grace period ended)',
      date: '8/12/2025',
      amount: 7425,
      fee: 0,
      netAmount: 7425,
      transactionHash: '0xe8d9c1'
    }
  ];

  const events: Event[] = [
    {
      id: '1',
      name: 'Summer Music Festival',
      date: '6/15/2025',
      status: 'COMPLETED',
      grossRevenue: 22500,
      platformFee: 225,
      netRevenue: 22275
    },
    {
      id: '2',
      name: 'Tech Conference 2025',
      date: '7/25/2025',
      status: 'ONGOING',
      grossRevenue: 42000,
      platformFee: 420,
      netRevenue: 41580,
      escrowAmount: 42000,
      escrowReleaseDate: '10/2/2025'
    },
    {
      id: '3',
      name: 'Blockchain Workshop',
      date: '8/10/2025',
      status: 'COMPLETED',
      grossRevenue: 7500,
      platformFee: 75,
      netRevenue: 7425
    }
  ];

  // Calculations
  const totalRevenue = 72000;
  const availableBalance = 12000;
  const walletBalance = 0;
  const platformFeesPaid = 720;
  const escrowAmount = 60000;

  const maxWithdrawAmount = availableBalance;

  const handleMaxClick = () => {
    setWithdrawAmount(maxWithdrawAmount.toString());
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !destinationAddress) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Withdrawing IDRX ${withdrawAmount} to ${destinationAddress}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Revenue':
        return '✓';
      case 'Withdrawal':
        return '✓';
      case 'Escrow':
        return '🛡️';
      case 'Escrow_release':
        return '🛡️';
      default:
        return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Revenue':
        return 'text-blue-600';
      case 'Withdrawal':
        return 'text-red-600';
      case 'Escrow':
        return 'text-yellow-600';
      case 'Escrow_release':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your revenue, withdrawals, and financial performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">IDRX {totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">All-time earnings</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Available Balance</span>
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">IDRX {availableBalance.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Ready to withdraw</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Wallet Balance</span>
              <CreditCard className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">IDRX {walletBalance}</div>
            <div className="text-xs text-gray-500 mt-1">Current wallet balance</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Platform Fees Paid</span>
              <ArrowDownToLine className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">IDRX {platformFeesPaid}</div>
            <div className="text-xs text-gray-500 mt-1">1% of total revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('event')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'event'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Event Revenue
              </button>
              <button
                onClick={() => setActiveTab('transaction')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'transaction'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transaction History
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'withdraw'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Event Revenue Tab */}
            {activeTab === 'event' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Revenue by Event</h2>
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedEventFilter}
                      onChange={(e) => setSelectedEventFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>All Events</option>
                      <option>Completed</option>
                      <option>Ongoing</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Event</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Gross Revenue</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Platform Fee (1%)</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Net Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">{event.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{event.date}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              event.status === 'COMPLETED' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-right text-gray-900">IDRX {event.grossRevenue.toLocaleString()}</td>
                          <td className="py-4 px-4 text-sm text-right text-orange-600">IDRX {event.platformFee}</td>
                          <td className="py-4 px-4 text-sm text-right font-medium text-green-600">IDRX {event.netRevenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transaction History Tab */}
            {activeTab === 'transaction' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedTimeFilter}
                      onChange={(e) => setSelectedTimeFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>All Time</option>
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Description</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fee</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Net Amount</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Tx Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getTypeIcon(tx.type)}</span>
                              <span className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                                {tx.type.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{tx.description}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{tx.date}</td>
                          <td className="py-4 px-4 text-sm text-right text-gray-900">IDRX {tx.amount.toLocaleString()}</td>
                          <td className="py-4 px-4 text-sm text-right text-orange-600">IDRX {tx.fee}</td>
                          <td className="py-4 px-4 text-sm text-right font-medium text-green-600">IDRX {tx.netAmount.toLocaleString()}</td>
                          <td className="py-4 px-4 text-sm text-gray-500">{tx.transactionHash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Withdraw Funds Tab */}
            {activeTab === 'withdraw' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Withdraw Balance</h2>

                {/* Escrow Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-900 mb-1">Escrow Protection Active</h3>
                    <p className="text-sm text-yellow-800">
                      IDRX {escrowAmount.toLocaleString()} is held in escrow. Funds will be available after event completion + 1 day grace period.
                    </p>
                  </div>
                </div>

                {/* Escrow Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Diamond Pattern Escrow Protection</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Event Status: Pending Completion</li>
                    <li>• Grace Period: 10/2/2025</li>
                    <li>• Escrow Amount: IDRX {escrowAmount.toLocaleString()}</li>
                    <li>• This protects buyers from event cancellation or issues</li>
                  </ul>
                </div>

                {/* Withdrawal Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={handleMaxClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                      >
                        Max
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Maximum: IDRX {maxWithdrawAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      placeholder="Enter wallet address (0x...)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    onClick={handleWithdraw}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center justify-center space-x-2"
                  >
                    <ArrowDownToLine className="w-5 h-5" />
                    <span>Withdraw Funds</span>
                  </button>
                </div>

                {/* Withdrawal Info */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Withdrawal Information</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Withdrawals are processed on the Lisk Sepolia network</li>
                    <li>• Processing time: 1-5 minutes</li>
                    <li>• Platform fee: 1% of withdrawal amount</li>
                    <li>• Gas fees are paid from your LSK balance</li>
                    <li>• Minimum withdrawal: IDRX 1</li>
                    <li>• Diamond Pattern events: Funds held in escrow until completion + grace period</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;