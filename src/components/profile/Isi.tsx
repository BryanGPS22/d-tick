"use client"

import React, { useState } from 'react';
import { User, Mail, Wallet, RotateCcw } from 'lucide-react';

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    alert('Wallet connected successfully!');
  };

  const tabs = [
    { id: 'personal-info', label: 'Personal Info', icon: User },
    { id: 'email-settings', label: 'Email Settings', icon: Mail },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: RotateCcw }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal information, wallet, and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-12">
            {!isWalletConnected ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Wallet Not Connected
                </h2>
                <p className="text-gray-600 mb-8">
                  Connect your Xellar wallet to view and edit your personal information
                </p>
                <button
                  onClick={handleConnectWallet}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  Wallet connected! Your profile information will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}