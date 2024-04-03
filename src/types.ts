export interface TimeLog {
  id: string;
  startTime: Date;
  stopTime: Date;
  recordTime: number;
  description?: string;
  category?: string;
  status?: string;
  isActive: boolean;
  createdAt: Date;
}
