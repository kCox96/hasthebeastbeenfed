export interface ICat {
  _id: string;
  name: string;
  feedingTimes: IFeed[];
  users: IUserIDs[];
}

export interface IFeed {
  time: string;
  foodType?: string;
}

export interface IUserIDs {
  userId: string;
}
