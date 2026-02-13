'use server';

import fs from 'fs';
import path from 'path';
import { RestaurantData } from '@/types/menu';

const DATA_DIR = path.join(process.cwd(), 'data');
const MENUS_DIR = path.join(DATA_DIR, 'menus');

export async function updateMenu(tenantId: string, data: RestaurantData) {
    if (!tenantId) {
        return { error: 'Tenant ID is required.' };
    }

    try {
        const menuPath = path.join(MENUS_DIR, `${tenantId}.json`);

        if (!fs.existsSync(menuPath)) {
            return { error: 'Menu file not found.' };
        }

        fs.writeFileSync(menuPath, JSON.stringify(data, null, 4), 'utf-8');

        return { success: true };
    } catch (error) {
        console.error('Update menu error:', error);
        return { error: 'Failed to update menu.' };
    }
}
