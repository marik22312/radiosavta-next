export interface Schedule {
        end_timestamp: Date;
        end: Date;
        id: number;
        is_now: boolean;
        name: string;
        start_timestamp: Date;
        start: Date;
        type: string;
}

export interface ScheduleResponse {
    schedule: Schedule[]
}