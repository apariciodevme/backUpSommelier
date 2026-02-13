'use server';

import fs from 'fs';
import path from 'path';
import { RestaurantData } from '@/types/menu';

const DATA_DIR = path.join(process.cwd(), 'data');
const TENANTS_FILE = path.join(DATA_DIR, 'tenants.json');
const MENUS_DIR = path.join(DATA_DIR, 'menus');

export async function authenticateAndLoad(code: string) {
    if (!code) {
        return { error: 'Please enter an access code.' };
    }

    try {
        const tenantsContent = fs.readFileSync(TENANTS_FILE, 'utf-8');
        const tenants = JSON.parse(tenantsContent);

        const tenant = tenants.find((t: any) => t.accessCode === code);

        if (tenant) {
            // Find menu file
            const menuPath = path.join(MENUS_DIR, `${tenant.id}.json`);

            // Fallback or specific file
            let finalMenuPath = menuPath;
            if (!fs.existsSync(menuPath)) {
                finalMenuPath = path.join(MENUS_DIR, 'demo.json');
            }

            const menuContent = fs.readFileSync(finalMenuPath, 'utf-8');
            const menuData = JSON.parse(menuContent) as RestaurantData;

            return {
                success: true,
                data: menuData,
                restaurantName: tenant.name,
                tenantId: tenant.id
            };
        } else {
            return { error: 'Invalid access code.' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'An error occurred during login.' };
    }
}
