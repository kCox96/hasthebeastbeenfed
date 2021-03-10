//For cat view screen has basic info all cats
export interface ICats {
  _id: string;
  name: string;
  feedingTimes?: IFeed;
  users: IUserID[];
}

//for single cat view/edit and creating cat
export interface ICat {
  _id?: string;
  name: string;
  feedingTimes?: IFeed[];
  users: IUserID[];
}

// Feeding time format for cats/cat
export interface IFeed {
  time: string;
  foodType?: string;
}

// format for user array
export interface IUserID {
  userId: string;
}

// For account page
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
}
