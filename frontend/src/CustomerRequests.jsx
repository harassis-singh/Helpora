
import { useEffect, useState } from 'react';
import './CustomerRequests.css';

function CustomerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem('helporaToken');

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/requests/provider',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch requests');
      }

      setRequests(data.requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update request');
      }

      setMessage(data.message);
      await fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  const getMessageDetails = (text) => {
    const details = {
      phone: '',
      address: '',
      additional: ''
    };

    if (!text) return details;

    const phoneMatch = text.match(/Customer phone:\s*(.*?)(?=\s+Service address:|$)/i);
    const addressMatch = text.match(/Service address:\s*(.*?)(?=\s+Additional message:|$)/i);
    const additionalMatch = text.match(/Additional message:\s*(.*)$/i);

    if (phoneMatch) details.phone = phoneMatch[1].trim();
    if (addressMatch) details.address = addressMatch[1].trim();
    if (additionalMatch) details.additional = additionalMatch[1].trim();

    if (!phoneMatch && !addressMatch && !additionalMatch) {
      details.additional = text;
    }

    return details;
  };

  return (
    <div className="customer-requests-page">
      <div className="requests-header">
        <div>
          <h1>Customer Requests</h1>
          <p>View and manage service requests from customers.</p>
        </div>

        <a href="/provider-dashboard">Back to Dashboard</a>
      </div>

      {message && <p className="request-success">{message}</p>}
      {error && <p className="request-error">{error}</p>}

      <div className="requests-list-card">
        <h2>Incoming Requests</h2>

        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p>No customer requests received yet.</p>
        ) : (
          <div className="requests-table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Requested Date</th>
                  <th>Customer Details</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => {
                  const details = getMessageDetails(request.message);

                  return (
                    <tr key={request._id}>
                      <td>
                        <div className="request-customer-name">
                          {request.customer?.name || 'Unknown'}
                        </div>
                        <div className="request-customer-email">
                          {request.customer?.email || ''}
                        </div>
                      </td>

                      <td>{request.service?.title || 'Service unavailable'}</td>

                      <td>
                        {new Date(request.requestedDate).toLocaleDateString()}
                      </td>

                      <td>
                        <div className="request-message-details">
                          {details.phone && (
                            <div>
                              <strong>Phone:</strong> {details.phone}
                            </div>
                          )}

                          {details.address && (
                            <div>
                              <strong>Address:</strong> {details.address}
                            </div>
                          )}

                          <div>
                            <strong>Message:</strong>{' '}
                            {details.additional || 'No additional message'}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={`request-status ${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>

                      <td>
                        <div className="request-action-buttons">
                          {request.status === 'Pending' && (
                            <>
                              <button
                                className="request-accept-btn"
                                onClick={() => updateStatus(request._id, 'Accepted')}
                              >
                                Accept
                              </button>

                              <button
                                className="request-reject-btn"
                                onClick={() => updateStatus(request._id, 'Rejected')}
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {request.status === 'Accepted' && (
                            <button
                              className="request-complete-btn"
                              onClick={() => updateStatus(request._id, 'Completed')}
                            >
                              Mark Completed
                            </button>
                          )}

                          {(request.status === 'Rejected' ||
                            request.status === 'Completed') && (
                            <span>No action</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerRequests;
