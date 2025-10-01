"use client"

import React, { useState } from 'react';
import { Search, Eye, X, Download, Check, XIcon, RefreshCw } from 'lucide-react';

// Types
interface OrganizerRequest {
  id: string;
  organizerName: string;
  email: string;
  walletAddress: string;
  status: 'APPROVED' | 'PENDING' | 'UNDER REVIEW' | 'REJECTED';
  submittedDate: string;
  additionalNotes: string;
  gdprConsent: {
    documentProcessing: 'GRANTED' | 'DENIED';
    identityVerification: 'GRANTED' | 'DENIED';
    dataRetention: 'ACKNOWLEDGED' | 'DENIED';
    communication: 'OPTED OUT' | 'OPTED IN';
  };
  documents: {
    name: string;
    type: string;
    size: string;
    uploadedDate: string;
    verified: boolean;
  }[];
  previousNotes?: {
    note: string;
    reviewedDate: string;
  }[];
}

const OrganizerRequestsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedRequest, setSelectedRequest] = useState<OrganizerRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  // Mock Data
  const [requests, setRequests] = useState<OrganizerRequest[]>([
    {
      id: '1',
      organizerName: 'Tech Events Indonesia',
      email: 'techevents@example.com',
      walletAddress: '0x123456789abcdef123456789abcdef123456789',
      status: 'APPROVED',
      submittedDate: '12/1/2024 5:30:00 PM',
      additionalNotes: 'We organize technology conferences and workshops in Jakarta.',
      gdprConsent: {
        documentProcessing: 'GRANTED',
        identityVerification: 'GRANTED',
        dataRetention: 'ACKNOWLEDGED',
        communication: 'OPTED OUT'
      },
      documents: [
        {
          name: 'npwp-tech-events-indonesia.docx',
          type: 'NPWP',
          size: '153.11 KB',
          uploadedDate: '12/1/2024',
          verified: true
        },
        {
          name: 'ktp-director.docx',
          type: 'KTP',
          size: '229.07 KB',
          uploadedDate: '12/1/2024',
          verified: true
        },
        {
          name: 'business-registration.docx',
          type: 'BUSINESS LICENSE',
          size: '435.12 KB',
          uploadedDate: '12/1/2024',
          verified: true
        }
      ],
      previousNotes: [
        {
          note: 'Verified business registration and tax documents. Approved for tech events.',
          reviewedDate: '12/3/2024'
        }
      ]
    },
    {
      id: '2',
      organizerName: 'Jakarta Music Collective',
      email: 'music@jakartacollective.com',
      walletAddress: '0xabcd...5678',
      status: 'UNDER REVIEW',
      submittedDate: '12/5/2024 4:15:00 PM',
      additionalNotes: 'Music events and concerts organizer based in Jakarta.',
      gdprConsent: {
        documentProcessing: 'GRANTED',
        identityVerification: 'GRANTED',
        dataRetention: 'ACKNOWLEDGED',
        communication: 'OPTED IN'
      },
      documents: [
        {
          name: 'business-permit.pdf',
          type: 'BUSINESS LICENSE',
          size: '245.50 KB',
          uploadedDate: '12/5/2024',
          verified: true
        }
      ]
    },
    {
      id: '3',
      organizerName: 'Bali Wellness Events',
      email: 'wellness@bali.com',
      walletAddress: '0x9876...5678',
      status: 'PENDING',
      submittedDate: '12/7/2024 11:45:00 PM',
      additionalNotes: 'Organizing wellness retreats and yoga events in Bali.',
      gdprConsent: {
        documentProcessing: 'GRANTED',
        identityVerification: 'GRANTED',
        dataRetention: 'ACKNOWLEDGED',
        communication: 'OPTED IN'
      },
      documents: [
        {
          name: 'npwp-bali-wellness.pdf',
          type: 'NPWP',
          size: '189.23 KB',
          uploadedDate: '12/7/2024',
          verified: false
        }
      ]
    },
    {
      id: '4',
      organizerName: 'Startup Fake Corp',
      email: 'fake@example.com',
      walletAddress: '0x5555...5678',
      status: 'REJECTED',
      submittedDate: '11/28/2024 3:20:00 PM',
      additionalNotes: 'Tech startup events organizer.',
      gdprConsent: {
        documentProcessing: 'GRANTED',
        identityVerification: 'DENIED',
        dataRetention: 'ACKNOWLEDGED',
        communication: 'OPTED OUT'
      },
      documents: [],
      previousNotes: [
        {
          note: 'Unable to verify business registration. Documentation incomplete.',
          reviewedDate: '11/30/2024'
        }
      ]
    }
  ]);

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'PENDING' || r.status === 'UNDER REVIEW').length,
    approved: requests.filter(r => r.status === 'APPROVED').length,
    rejected: requests.filter(r => r.status === 'REJECTED').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER REVIEW':
        return 'bg-orange-100 text-orange-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsentColor = (status: string) => {
    if (status === 'GRANTED' || status === 'ACKNOWLEDGED' || status === 'OPTED IN') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const handleReview = (request: OrganizerRequest) => {
    setSelectedRequest(request);
    setReviewNotes('');
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const handleApprove = () => {
    if (!reviewNotes.trim()) {
      alert('Please add review notes before approving');
      return;
    }
    if (selectedRequest) {
      setRequests(requests.map(r => 
        r.id === selectedRequest.id 
          ? { ...r, status: 'APPROVED' as const }
          : r
      ));
      alert(`Application approved for ${selectedRequest.organizerName}`);
      handleCloseModal();
    }
  };

  const handleReject = () => {
    if (!reviewNotes.trim()) {
      alert('Please add review notes before rejecting');
      return;
    }
    if (selectedRequest) {
      setRequests(requests.map(r => 
        r.id === selectedRequest.id 
          ? { ...r, status: 'REJECTED' as const }
          : r
      ));
      alert(`Application rejected for ${selectedRequest.organizerName}`);
      handleCloseModal();
    }
  };

  const handleDownload = (docName: string) => {
    alert(`Downloading ${docName}`);
  };

  const handleRefresh = () => {
    alert('Refreshing data...');
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.organizerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.walletAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All Statuses' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organizer Requests Management</h1>
          <p className="text-gray-600 mt-1">Review and manage organizer applications with document verification.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Requests</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or wallet address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All Statuses</option>
              <option>APPROVED</option>
              <option>PENDING</option>
              <option>UNDER REVIEW</option>
              <option>REJECTED</option>
            </select>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Organizer</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Wallet Address</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{request.organizerName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{request.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-mono">{request.walletAddress}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{request.submittedDate}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleReview(request)}
                        className="flex items-center space-x-1 px-3 py-1.5 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Review Organizer Application</h2>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded mt-2 ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Application Information */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📋</span> Application Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Organizer Name</p>
                        <p className="font-medium text-gray-900">{selectedRequest.organizerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium text-gray-900">{selectedRequest.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Wallet Address</p>
                        <p className="font-mono text-sm text-gray-900 break-all">{selectedRequest.walletAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="font-medium text-gray-900 flex items-center">
                          📅 {selectedRequest.submittedDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2">📝</span> Additional Notes
                    </h3>
                    <p className="text-sm text-gray-700">{selectedRequest.additionalNotes}</p>
                  </div>

                  {/* GDPR Consent Status */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🛡️</span> GDPR Consent Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Document Processing</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getConsentColor(selectedRequest.gdprConsent.documentProcessing)}`}>
                          {selectedRequest.gdprConsent.documentProcessing}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Identity Verification</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getConsentColor(selectedRequest.gdprConsent.identityVerification)}`}>
                          {selectedRequest.gdprConsent.identityVerification}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Data Retention</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getConsentColor(selectedRequest.gdprConsent.dataRetention)}`}>
                          {selectedRequest.gdprConsent.dataRetention}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Communication</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getConsentColor(selectedRequest.gdprConsent.communication)}`}>
                          {selectedRequest.gdprConsent.communication}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Uploaded Documents */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📄</span> Uploaded Documents ({selectedRequest.documents.length})
                    </h3>
                    <div className="space-y-3">
                      {selectedRequest.documents.map((doc, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                              <p className="text-xs text-gray-400">Uploaded {doc.uploadedDate}</p>
                            </div>
                            {doc.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                                ✓ VERIFIED
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDownload(doc.name)}
                            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Review */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Review</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                      <textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add notes about the application review (required for approval/rejection)..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {selectedRequest.previousNotes && selectedRequest.previousNotes.length > 0 && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Previous Notes</label>
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          {selectedRequest.previousNotes.map((note, index) => (
                            <div key={index}>
                              <p className="text-sm text-gray-700">{note.note}</p>
                              <p className="text-xs text-gray-400 mt-1">Reviewed on {note.reviewedDate}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center space-x-2 px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <XIcon className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerRequestsManagement;