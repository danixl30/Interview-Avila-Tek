export interface Service<T, U> {
    execute(data: T): Promise<U>
}
