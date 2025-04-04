import { useNotify, useRecordContext, useRefresh } from 'react-admin';

export const EventStatusButtons = ({ record = useRecordContext() }) => {
    const notify = useNotify();
    const refresh = useRefresh();
    
    if (!record) return null;

    const API_URL: string = `${import.meta.env.VITE_API_URL}/api/admin`;

    const handleStatusChange = async (newStatus: 'published' | 'cancelled') => {
        try {
            const response = await fetch(`${API_URL}/event/${record.id}/${newStatus}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            notify(`Status updated to ${newStatus}`, { type: 'success' });
            refresh();
        } catch (error) {
            notify('Failed to change status', { type: 'error' });
        }
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            {record.status !== 'published' && <button onClick={() => handleStatusChange('published')}>Publish</button>}
            {record.status !== 'cancelled' && <button onClick={() => handleStatusChange('cancelled')}>Cancel</button>}
        </div>
    );
};
