export interface ICard {
  id: number;
  title: string;
  description: string;
  list_id: number;
  expiray_date: string;
  createdAt: string;
  updatedAt: string;
  histories?: ICardHistory[];
}

export interface ICardHistory {
  id: number;
  card_id: number;
  move_from: number;
  move_to: number;
  createdAt: string;
  updatedAt: string;
  to: IList;
  from: IList;
}

export interface IList {
  id: number;
  title: string;
  board_id: number;
  position: number | null;
  createdAt: string;
  updatedAt: string;
}
