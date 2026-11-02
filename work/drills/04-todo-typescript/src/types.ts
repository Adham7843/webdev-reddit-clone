// A union of the only three filter values the app accepts.
export type Filter = "all" | "active" | "completed";

// The shape of one todo item.
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
