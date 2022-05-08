export abstract class AbstractPassportStrategy {
    abstract validate(...data: unknown[]): unknown
}
