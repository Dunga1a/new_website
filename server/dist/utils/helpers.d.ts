export declare function hashPassword(rawPassword: string): Promise<string>;
export declare function compareHash(rawPassword: string, hashedPassword: string): Promise<true>;
export declare const generateUUIDV4: () => string;
