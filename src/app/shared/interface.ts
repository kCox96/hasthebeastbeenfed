export interface ICats {
  _id: string;
  name: string;
  feedingTimes: IFeed;
  users: IUserID[];
}

export interface ICat {
  _id: string;
  name: string;
  feedingTimes: IFeed[];
  users: IUserID[];
}

export interface IFeed {
  time: string;
  foodType?: string;
}

export interface IUserID {
  userId: string;
}
