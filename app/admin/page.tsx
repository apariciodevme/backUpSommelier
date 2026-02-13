'use client';

import { useState } from 'react';
import LoginScreen from '../components/LoginScreen';
import AdminDashboard from '../components/AdminDashboard';
import { RestaurantData } from '@/types/menu';

export default function AdminPage() {
    const [authData, setAuthData] = useState<{
        data: RestaurantData;
        name: string;
        tenantId: string;
    } | null>(null);

    // Initial load, show login
    if (!authData) {
        return (
            <LoginScreen
                onLogin={(data, name, tenantId) => {
                    if (tenantId) {
                        setAuthData({ data, name, tenantId });
                    } else {
                        alert("Error: No tenant ID found. Please report this.");
                    }
                }}
            />
        );
    }

    return (
        <AdminDashboard
            initialData={authData.data}
            tenantId={authData.tenantId}
            restaurantName={authData.name}
            onLogout={() => setAuthData(null)}
        />
    );
}
