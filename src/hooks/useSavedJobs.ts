import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

export function useSavedJobs() {
    const { user, toggleSaveJob } = useAuth();

    // For guest users, we could still use localStorage, or we can force login.
    // Let's implement a hybrid approach -> If logged in, use User Profile.
    // If guest, use local state (simple localStorage).

    // Actually, to make it simple and consistent:
    // If user is logged in, use their profile.
    // If guest, maintain local `savedIds` state.

    const [guestSavedIds, setGuestSavedIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!user) {
            const saved = localStorage.getItem('savedJobs_guest');
            if (saved) {
                try {
                    setGuestSavedIds(JSON.parse(saved));
                } catch (e) { console.error(e); }
            }
        }
        setIsLoaded(true);
    }, [user]);

    const savedIds = user ? (user.savedJobs || []) : guestSavedIds;

    const toggleSave = (id: string) => {
        if (user) {
            toggleSaveJob(id);
        } else {
            const newIds = guestSavedIds.includes(id)
                ? guestSavedIds.filter(x => x !== id)
                : [...guestSavedIds, id];

            setGuestSavedIds(newIds);
            localStorage.setItem('savedJobs_guest', JSON.stringify(newIds));
        }
    };

    return { savedIds, toggleSave, isLoaded };
}
