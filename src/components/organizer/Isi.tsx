"use client"

import React, { useState } from 'react';
import { Download, Mail, User, Upload, Info, AlertCircle } from 'lucide-react';

export default function EventOrganizerForm() {
  const [formData, setFormData] = useState({
    walletAddress: '',
    organizerName: '',
    emailAddress: '',
    additionalNotes: '',
    consent1: false,
    consent2: false,
    consent3: false,
    optionalConsent: false
  });

  const [fileName, setFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become an Event Organizer
          </h1>
          <p className="text-gray-600">
            Join Lummy&apos;s network of verified event organizers with our streamlined application process.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Application Template */}
          <div>
            <div className="flex items-start gap-2 mb-4">
              <div className="text-purple-600 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">1. Application Template</h2>
              </div>
            </div>
            <p className="text-gray-600 mb-4 ml-7">
              Download our application template, fill it out with your business information, and upload the completed document.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 ml-7 mb-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Template includes fields for:</p>
                  <p className="text-sm text-blue-800">
                    NPWP (Tax ID), KTP (Identity), Business Registration, Event Experience, Contact Details
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Downloading template...')}
              className="ml-7 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Application Template
            </button>
          </div>

          {/* Section 2: Lummy Contact Email */}
          <div>
            <div className="flex items-start gap-2 mb-4">
              <Mail className="w-5 h-5 text-purple-600 mt-1" />
              <h2 className="text-xl font-semibold text-gray-900">2. Lummy Contact Email</h2>
            </div>
            <p className="text-gray-600 mb-4 ml-7">
              For any questions or support during the application process:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 ml-7">
              <a href="mailto:organizer@lummy.app" className="text-purple-600 font-medium hover:underline">
                organizer@lummy.app
              </a>
              <p className="text-sm text-gray-500 mt-1">Response time: Within 24 hours</p>
            </div>
          </div>

          {/* Section 3: Application Details */}
          <div>
            <div className="flex items-start gap-2 mb-4">
              <User className="w-5 h-5 text-purple-600 mt-1" />
              <h2 className="text-xl font-semibold text-gray-900">3. Application Details</h2>
            </div>

            <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                  placeholder="Your name or company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="ml-7 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>

            <div className="ml-7 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional information about your events or experience..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {/* Section 4: Document Submission */}
          <div>
            <div className="flex items-start gap-2 mb-4">
              <Upload className="w-5 h-5 text-purple-600 mt-1" />
              <h2 className="text-xl font-semibold text-gray-900">4. Document Submission</h2>
            </div>
            <p className="text-gray-600 mb-4 ml-7">
              Upload your completed application template (DOCX format only).
            </p>

            <div className="ml-7">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Completed Application Template <span className="text-red-500">*</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Drag & drop your DOCX file here, or{' '}
                    <span className="text-purple-600 hover:underline">browse files</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Maximum file size: 10MB</p>
                  {fileName && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      Selected: {fileName}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Data Processing Consent */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Data Processing Consent</h3>
            <p className="text-sm text-gray-700 mb-4">
              In accordance with data protection regulations, we need your consent to process your personal information and documents for organizer verification.
            </p>

            <div className="space-y-3 mb-4">
              <p className="text-sm font-semibold text-red-600">REQUIRED CONSENTS:</p>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent1"
                  checked={formData.consent1}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I consent to Lummy processing my uploaded documents (NPWP, KTP, business license) for organizer verification purposes.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent2"
                  checked={formData.consent2}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I consent to identity and business verification using the information and documents I provide.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent3"
                  checked={formData.consent3}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I understand that my documents and data will be retained for 2 years after approval for compliance purposes, and I can request deletion at any time via{' '}
                  <a href="mailto:privacy@lummy.app" className="text-purple-600 hover:underline">
                    privacy@lummy.app
                  </a>
                </span>
              </label>
            </div>

            <div className="border-t border-blue-300 pt-4 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">OPTIONAL CONSENTS:</p>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="optionalConsent"
                  checked={formData.optionalConsent}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  I would like to receive updates about new features, platform improvements, and organizer resources via email (you can unsubscribe at any time).
                </span>
              </label>
            </div>

            <div className="bg-white rounded p-3 text-xs text-gray-600">
              <strong>Your Rights:</strong> You have the right to access, correct, delete, or port your data. You can withdraw consent at any time by contacting{' '}
              <a href="mailto:privacy@lummy.app" className="text-purple-600 hover:underline">
                privacy@lummy.app
              </a>
              . For full details, see our{' '}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium py-4 rounded-lg transition-colors text-lg"
          >
            Submit Application
          </button>

          {/* Warning Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-800">
              Connect your wallet to auto-fill your wallet address and ensure accurate submission.
            </p>
          </div>

          {/* Need Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Need Help?</p>
                <p className="text-sm text-blue-800">
                  Contact our support team:{' '}
                  <a href="mailto:support@lummy.app" className="text-blue-600 hover:underline font-medium">
                    support@lummy.app
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}