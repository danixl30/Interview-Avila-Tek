export interface TokenGenerator {
    sign<T extends object>(data: T): Promise<string>
    verify<T extends object>(value: string): Promise<T>
}
