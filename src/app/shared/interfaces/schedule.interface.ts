export interface ScheduleInterface {
    id: number;
    message: string;
    send_at_date: Date;
    send_at_time: string;
    phones: string[];
}