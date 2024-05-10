export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  date: string; // Store date as a string in the format 'YYYY-MM-DD'
}
