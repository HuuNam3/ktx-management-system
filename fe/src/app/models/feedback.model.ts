export interface FeedbackStats {
  pending: number;
  resolved: number;
  highPriority: number;
  total: number;
}

export interface Feedback {
  id: number;
  student: string;
  room: string;
  type: string;
  content: string;
  date: string;
  priority: 'cao' | 'trung-binh' | 'thap';
  status: 'cho-xu-ly' | 'dang-xu-ly' | 'da-xu-ly';
}
