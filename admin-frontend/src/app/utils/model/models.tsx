export type Filters = {
    name: string
    label: string,
    options?: any,
    type ?: string
}
export type QueryResponse = {
    success: boolean
    message: string
    data?: any
}