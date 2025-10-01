"use client"

import React, { useState } from 'react';
import { X, Info, Download, RefreshCw, FileText, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface WithdrawalHistory {
  id: string;
  amount: number;
  timestamp: string;
  transactionHash: string;
  status: 'COMPLETED' | 'PENDING';
}

interface RevenueSource {
  name: string;
  amount: number;
  percentage: number;
}

interface MonthlyFee {
  month: string;
  amount: number;
  growth: number;
}

const App: React.FC = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [newAddress, setNewAddress] = useState('');

  // Data
  const stats = {
    totalFeesCollected: 25750000,
    availableForWithdrawal: 8250000,
    monthlyRevenue: 8250000,
    monthlyGrowth: 42,
    avgDailyRevenue: 275000,
    dailyTransactions: 342
  };

  const currentFeeReceiver = '0x1234567890abcdef1234567890abcdef12345678';
  const platformFeeRate = 1;

  const revenueBreakdown: RevenueSource[] = [
    { name: 'Primary Ticket Sales', amount: 18500000, percentage: 72 },
    { name: 'Resale Fees', amount: 5750000, percentage: 22 },
    { name: 'Event Cancellation Fees', amount: 1500000, percentage: 8 }
  ];

  const monthlyFeeTrend: MonthlyFee[] = [
    { month: 'Oct 2024', amount: 4500000, growth: 0 },
    { month: 'Nov 2024', amount: 3200000, growth: -29 },
    { month: 'Dec 2024', amount: 5800000, growth: 81 },
    { month: 'Jan 2025', amount: 8250000, growth: 42 }
  ];

  const withdrawalHistory: WithdrawalHistory[] = [
    { id: 'w_001', amount: 15000000, timestamp: '2025-01-20 10:30', transactionHash: '0xabc123...', status: 'COMPLETED' },
    { id: 'w_002', amount: 2500000, timestamp: '2025-01-15 14:15', transactionHash: '0xdef456...', status: 'COMPLETED' },
    { id: 'w_003', amount: 5000000, timestamp: '2025-01-22 16:45', transactionHash: '0x789gh1...', status: 'PENDING' }
  ];

  const formatCurrency = (amount: number): string => {
    return `IDR ${amount.toLocaleString('id-ID')}`;
  };

  const handleWithdraw = () => {
    console.log('Withdrawing:', withdrawAmount);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  const handleUpdateAddress = () => {
    console.log('Updating address to:', newAddress);
    setShowUpdateAddressModal(false);
    setNewAddress('');
  };

  const getMaxAmount = () => Math.max(...monthlyFeeTrend.map(m => m.amount));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Revenue Management</h1>
          <p className="text-gray-600 mt-1">Monitor platform fees, manage withdrawals, and track financial performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Total Fees Collected</p>
            <h3 className="text-2xl font-bold text-green-600 mb-1">{formatCurrency(stats.totalFeesCollected)}</h3>
            <p className="text-sm text-gray-500">Lifetime platform fees</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Available for Withdrawal</p>
            <h3 className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(stats.availableForWithdrawal)}</h3>
            <p className="text-sm text-gray-500">Ready to withdraw</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-purple-600 mb-1">{formatCurrency(stats.monthlyRevenue)}</h3>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.monthlyGrowth}% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Avg Daily Revenue</p>
            <h3 className="text-2xl font-bold text-orange-600 mb-1">{formatCurrency(stats.avgDailyRevenue)}</h3>
            <p className="text-sm text-gray-500">{stats.dailyTransactions} transactions</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Platform Fee Rate: {platformFeeRate}%</p>
            <p className="text-sm text-blue-800 mt-1">Fee percentage is hardcoded in smart contract and cannot be modified. Only the fee receiver address can be updated.</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Actions</h3>
            <p className="text-sm text-gray-600 mb-6">Manage platform revenue withdrawals</p>
            
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg mb-3 flex items-center justify-center transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Withdraw Fees ({formatCurrency(stats.availableForWithdrawal)})
            </button>

            <div className="flex gap-3">
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 flex items-center justify-center transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Blockchain Data
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 flex items-center justify-center transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>

          {/* Fee Receiver Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Fee Receiver Settings</h3>
            <p className="text-sm text-gray-600 mb-6">Current platform fee recipient address</p>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current Fee Receiver</label>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-800 break-all">
                {currentFeeReceiver}
              </div>
            </div>

            <button
              onClick={() => setShowUpdateAddressModal(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <Settings className="w-5 h-5 mr-2" />
              Update Receiver Address
            </button>
          </div>
        </div>

        {/* Revenue Breakdown & Monthly Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue Breakdown</h3>
            <p className="text-sm text-gray-600 mb-6">Sources of platform fees</p>
            
            <div className="space-y-6">
              {revenueBreakdown.map((source, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{source.name}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(source.amount)}</div>
                      <div className="text-xs text-gray-500">{source.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Fee Trend */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly Fee Trend</h3>
            <p className="text-sm text-gray-600 mb-6">Platform fee collection over time</p>
            
            <div className="space-y-4">
              {monthlyFeeTrend.map((month, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(month.amount)}</div>
                      {month.growth !== 0 && (
                        <div className={`text-xs flex items-center justify-end ${month.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {month.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {Math.abs(month.growth)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(month.amount / getMaxAmount()) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Withdrawal History</h3>
          <p className="text-sm text-gray-600 mb-6">Recent platform fee withdrawals</p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Withdrawal ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Transaction Hash</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{withdrawal.id}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">{formatCurrency(withdrawal.amount)}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{withdrawal.timestamp}</td>
                    <td className="py-4 px-4 text-sm text-blue-600 font-mono">{withdrawal.transactionHash}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        withdrawal.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {withdrawal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Fees Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Withdraw Platform Fees</h2>
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  Available balance: {formatCurrency(stats.availableForWithdrawal)}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount (IDR)
                </label>
                <input
                  type="text"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount to withdraw"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Fees will be transferred to:</p>
                <p className="text-sm font-mono text-gray-800 bg-gray-50 p-3 rounded-lg break-all">
                  {currentFeeReceiver}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Fee Receiver Modal */}
      {showUpdateAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Update Fee Receiver Address</h2>
                <button 
                  onClick={() => setShowUpdateAddressModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                  !
                </div>
                <p className="text-sm text-orange-900">
                  This will call setPlatformFeeReceiver() on the smart contract.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address
                </label>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-800 break-all">
                  {currentFeeReceiver}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Fee Receiver Address
                </label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpdateAddressModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAddress}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;