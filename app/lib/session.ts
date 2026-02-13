'use client';

import { RestaurantData } from '@/types/menu';

const SESSION_KEY = 'palate_sommelier_session';

export interface SessionData {
    tenantId: string;
    restaurantName: string;
    menuData: RestaurantData;
}

export const saveSession = (data: SessionData) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    }
};

export const getSession = (): SessionData | null => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse session", e);
                return null;
            }
        }
    }
    return null;
};

export const clearSession = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY);
    }
};
