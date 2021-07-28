/* Copyright (c) 2020 . All Rights Reserved. */

import {SecUser} from "./sec-user.model";
import {SecWinDescr} from "./sec-win-descr.model";

export class SecWin {
  index: any;
  pdel: string;
  pins: string;
  psel: string;
  pupd: string;
  maxOpen: number;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  languageId: number;
  secUser: SecUser;
  secWinDescr: SecWinDescr;
  secWinPrimaryKey: { winId: string; userId: string };
  action: string;
  userId: string;
  windowId: string;
  winId: string;
  insertDatetimeDisplay: string;
  updateDatetimeDisplay: string;
}