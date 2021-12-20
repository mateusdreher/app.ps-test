export interface ResponseInterface {
    status: 'error' | 'success';
    data: any;
    message?: string;
}