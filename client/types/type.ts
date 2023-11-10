export type Directory = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Document = {
  _id: string;
  directory: string;
  originalName: string;
  savedName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
