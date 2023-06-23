export const USER = 'user';
export const MENU = 'menu';
export const RESTAURANT = 'restaurant';
export const TABLE = 'table';
export const CART = 'cart';
export const ORDER = 'order';
export const STATUS_CODE_RESPONSE = 401;

export enum RoleEnum {
    Buyer = 'buyer',
    Seller = 'seller',
    Admin = 'admin',
}

export enum OrderEnum {
    Pending = 'pending',
    Transit = 'transit',
    Completed = 'completed',
}