"use client"

import React, { useState } from 'react';
import { Plus, Upload, Info, CheckCircle, AlertCircle, X } from 'lucide-react';

interface TicketTier {
  id: string;
  tierName: string;
  description: string;
  ticketPrice: number;
  quantityAvailable: number;
  maxPerPurchase: number;
  nftBackground: File | null;
  benefits: string[];
}

export default function CreateEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    eventPoster: null as File | null,
    eventBanner: null as File | null,
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    enableTicketResale: true,
    maxMarkupPercentage: 15,
    organizerFeePercentage: 2.5,
    restrictResaleTiming: false
  });

  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    {
      id: '1',
      tierName: 'General Admission',
      description: 'Standard festival access',
      ticketPrice: 50,
      quantityAvailable: 300,
      maxPerPurchase: 4,
      nftBackground: null,
      benefits: []
    }
  ]);

  const [newBenefit, setNewBenefit] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleToggle = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      tierName: '',
      description: '',
      ticketPrice: 0,
      quantityAvailable: 0,
      maxPerPurchase: 1,
      nftBackground: null,
      benefits: []
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const updateTicketTier = <K extends keyof TicketTier>(id: string, field: K, value: TicketTier[K]) => {
    setTicketTiers(tiers =>
      tiers.map(tier =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const removeTicketTier = (id: string) => {
    setTicketTiers(tiers => tiers.filter(tier => tier.id !== id));
  };

  const addBenefit = (tierId: string) => {
    if (newBenefit.trim()) {
      setTicketTiers(tiers =>
        tiers.map(tier =>
          tier.id === tierId
            ? { ...tier, benefits: [...tier.benefits, newBenefit.trim()] }
            : tier
        )
      );
      setNewBenefit('');
    }
  };

  const removeBenefit = (tierId: string, benefitIndex: number) => {
    setTicketTiers(tiers =>
      tiers.map(tier =>
        tier.id === tierId
          ? { ...tier, benefits: tier.benefits.filter((_, i) => i !== benefitIndex) }
          : tier
      )
    );
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Ticket Tiers:', ticketTiers);
    alert('Event created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Event</h1>

        <div className="space-y-6">
          {/* Event Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Info</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Event description"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select category</option>
                  <option value="music">Music</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event Images */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Event Images (2 Required)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              (NOTE) 2 event images. NFT backgrounds are configured general on the ticket section below.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  1. Event Poster (16:9 ratio)
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  Will be used for tile on feed/market. Recommended: 1920×1080
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'eventPoster')}
                  className="hidden"
                  id="poster-upload"
                />
                <label
                  htmlFor="poster-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm"
                >
                  Choose File
                </label>
                <span className="ml-3 text-sm text-gray-600">
                  {formData.eventPoster ? formData.eventPoster.name : 'No file chosen'}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  2. Event Banner (21:9 ratio)
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  Will be used for the detail of event. Recommended: 1920×823px
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'eventBanner')}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm"
                >
                  Choose File
                </label>
                <span className="ml-3 text-sm text-gray-600">
                  {formData.eventBanner ? formData.eventBanner.name : 'No file chosen'}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <strong>Main Upload Enabled</strong>
                  <p className="mt-1">
                    Images automatically scaled to NFT&apos;s after cropping. Check resized NFT&apos;s limit above for verification.
                  </p>
                  <p className="mt-2">
                    Upload event images first, their configured NFT backgrounds can be set below. All images will be combined into one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lummy Ticketing System */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lummy Ticketing System</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your event uses Lummy, a advanced Sianmax smart contract system with escrow protection.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-green-900 text-sm">Built-in Escrow Protection</strong>
                  <p className="text-sm text-green-800 mt-1">
                    Funds held securely until event completion. Buyers get automatic refunds if event is cancelled.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Diamond Pattern NFT Tickets <span className="text-purple-600">SIANMAX SECURITY</span>
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Advanced smart contract combination with diamond-IDs and enhanced liquidity:
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Multi-signature escrow with time-locked releases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Enhanced metadata with tier-based pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Gasless transactions with ERC-2771</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>On-chain quantum mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Automated refunding & RSVP patterns hub</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ERC-721A optimized batch mint (save gas)</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <strong>Revenue Structure: You receive 93% of ticket sales immediately</strong>
                  <p className="mt-1">
                    Platform fee (7%) is deducted at purchase time. No hidden fees or withdrawal charges. 
                    Escrow funds are released after event completion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="MM/DD/YYYY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Ticket Tiers */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <strong>Integrated Tier Curation</strong>
                <p className="mt-1">
                  Your ticket tiers will be created automatically when you publish this form. No need to add tiers first.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Ticket Tiers</h3>
              <button
                onClick={addTicketTier}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Tier
              </button>
            </div>

            <div className="space-y-6">
              {ticketTiers.map((tier, index) => (
                <div key={tier.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      TIER {index + 1}
                    </div>
                    {ticketTiers.length > 1 && (
                      <button
                        onClick={() => removeTicketTier(tier.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tier Name</label>
                      <input
                        type="text"
                        value={tier.tierName}
                        onChange={(e) => updateTicketTier(tier.id, 'tierName', e.target.value)}
                        placeholder="General Admission"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={tier.description}
                        onChange={(e) => updateTicketTier(tier.id, 'description', e.target.value)}
                        placeholder="Standard festival access"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Price</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={tier.ticketPrice}
                            onChange={(e) => updateTicketTier(tier.id, 'ticketPrice', parseFloat(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                            50 IDRX
                          </span>
                        </div>
                        <p className="text-xs text-purple-600 mt-1">Payment unit: IDRX</p>
                        <p className="text-xs text-gray-500 mt-1">Your&apos;ll Receive:</p>
                        <p className="text-xs text-blue-600">
                          ⓘ {(tier.ticketPrice * 0.93).toFixed(2)} IDRX (SIANMAX FEE DEDUCTED: {(tier.ticketPrice * 0.07).toFixed(2)}) = {tier.ticketPrice.toFixed(2)} IDRX TOTAL
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available</label>
                        <input
                          type="number"
                          value={tier.quantityAvailable}
                          onChange={(e) => updateTicketTier(tier.id, 'quantityAvailable', parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Per Purchase</label>
                      <input
                        type="number"
                        value={tier.maxPerPurchase}
                        onChange={(e) => updateTicketTier(tier.id, 'maxPerPurchase', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NFT Background for {tier.tierName || 'General Admission'}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Upload NFT background image for {tier.tierName || 'General Admission'}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) updateTicketTier(tier.id, 'nftBackground', file);
                          }}
                          className="hidden"
                          id={`nft-${tier.id}`}
                        />
                        <label
                          htmlFor={`nft-${tier.id}`}
                          className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer text-sm"
                        >
                          Choose Image
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Square aspect ratio (1:1). Recommended: 512×512px. Image will be cropped to 512px automatically.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                        <p className="text-xs text-blue-900">
                          ⓘ <strong>Permission Status:</strong> When in development with NFT&apos;s stored
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benefits (Optional)
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newBenefit}
                          onChange={(e) => setNewBenefit(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addBenefit(tier.id);
                            }
                          }}
                          placeholder="Add a benefit, e.g. VIP access, meet greet etc"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => addBenefit(tier.id)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                        >
                          Add
                        </button>
                      </div>
                      {tier.benefits.length > 0 && (
                        <div className="space-y-2">
                          {tier.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm text-gray-700">{benefit}</span>
                              <button
                                onClick={() => removeBenefit(tier.id, idx)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Resale Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Resale Settings</h3>
            <p className="text-sm text-gray-600 mb-6">
              Control how your tickets can be resold on our NFT marketplace. These settings are enforced by smart contracts.
              (Note: Settings can be changed after the event is live)
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Enable Ticket Resale</h4>
                  <p className="text-sm text-gray-600">
                    Allow tickets for this event to be resold on the marketplace
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('enableTicketResale')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.enableTicketResale ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enableTicketResale ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Maximum Markup Percentage</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.maxMarkupPercentage}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxMarkupPercentage: parseFloat(e.target.value) }))}
                      className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Cap the maximum price above original that resellers can list for resold tickets (Znamm: can be resold for 15%.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Lummy platform fee (7%) is added automatically at [all resale].
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Organizer Fee Percentage</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.organizerFeePercentage}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizerFeePercentage: parseFloat(e.target.value) }))}
                      className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Set the percentage you get from each resale transaction. (Common: estimated - max 10%).
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Lummy platform fee is (7%) is added automatically at [all resale].
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Restrict resale timing</h4>
                  <p className="text-sm text-gray-600">
                    Prevent ticket resales within [X] days of the event date
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('restrictResaleTiming')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.restrictResaleTiming ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.restrictResaleTiming ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-sm text-orange-800">
              <strong>MINIMUM CHANGE:</strong> Changes need to be saved manually
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              Create Event & Tiers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}