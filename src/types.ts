export type SignInData = {
  authToken: string;
  user: User;
};

export type Token = Omit<SignInData, "user">;

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  _id: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};
