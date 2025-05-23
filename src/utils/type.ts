export type RootStackParamList = {
  Home:undefined;
  Login:undefined
  EditTask: { task: Task };
};


export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
};