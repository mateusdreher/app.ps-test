export interface ScheduleInterface {
    id: number;
    message: string;
    send_at: Date;
    phones: string[];
}