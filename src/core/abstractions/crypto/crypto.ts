export interface Crypto {
    encrypt(value: string): Promise<string>
    compare(normal: string, encryted: string): Promise<boolean>
}
