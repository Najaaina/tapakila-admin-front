import { useUpdate, useRecordContext } from 'react-admin';
import { Button } from '@mui/material';

const RoleButton = () => {
    const record = useRecordContext();
    const [update, { isLoading }] = useUpdate();

    if (!record) return null;

    const handleClick = async () => {
        const newRole = record.role === 'user' ? 'admin' : 'user';

        try {
            await update(
                'accounts',
                { id: record.id, data: { role: newRole }, previousData: record },
                {
                    onSuccess: () => {
                        // Rafraîchir ou faire d'autres actions
                        window.location.reload();
                    },
                    onError: (error) => {
                        console.error('Erreur lors de la mise à jour du rôle :', error);
                    },
                }
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle :', error);
        }
    };

    return (
        <Button onClick={handleClick} disabled={isLoading}>
            {isLoading ? 'Changement...' : `${record.role === 'user' ? 'user' : 'admin'}`}
        </Button>
    );
};

export default RoleButton;
