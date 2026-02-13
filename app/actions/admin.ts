'use server';

import fs from 'fs';
import path from 'path';
import { RestaurantData, RestaurantDataSchema } from '@/types/menu';

const DATA_DIR = path.join(process.cwd(), 'data');
const MENUS_DIR = path.join(DATA_DIR, 'menus');

export async function updateMenu(tenantId: string, data: RestaurantData) {
    if (!tenantId) {
        return { error: 'Tenant ID is required.' };
    }

    // Validate data against schema
    const validation = RestaurantDataSchema.safeParse(data);
    if (!validation.success) {
        console.error('Validation error:', validation.error);
        return { error: 'Invalid data format: ' + validation.error.issues.map(i => i.message).join(', ') };
    }

    try {
        const menuPath = path.join(MENUS_DIR, `${tenantId}.json`);

        if (!fs.existsSync(menuPath)) {
            return { error: 'Menu file not found.' };
        }

        fs.writeFileSync(menuPath, JSON.stringify(validation.data, null, 4), 'utf-8');

        return { success: true };
    } catch (error) {
        console.error('Update menu error:', error);
        return { error: 'Failed to update menu.' };
    }
}
