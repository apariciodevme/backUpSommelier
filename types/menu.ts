export interface WinePairing {
    name: string;
    vintage: string;
    price: string;
    note: string;
    grape: string;
}

export interface Pairings {
    byGlass: WinePairing;
    midRange: WinePairing;
    exclusive: WinePairing;
}

export interface MenuItem {
    dish: string;
    price: number | string;
    pairings: Pairings;
}

export interface MenuCategory {
    category: string;
    items: MenuItem[];
}

export interface RestaurantData {
    restaurantName: string;
    menu: MenuCategory[];
}