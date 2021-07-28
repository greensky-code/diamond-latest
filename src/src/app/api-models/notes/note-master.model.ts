/* Copyright (c) 2020 . All Rights Reserved. */

import { NoteType } from "./note-type.model";

export class NoteMaster {
  seqNoteId: number;
  noteType: string;
  seqSourceId: number;
  charSourceId: string;
  noteDate: string;
  noteText: string;
  noteTypeViewModel: NoteType
  expirationDate: string;
  followupDate: string;
  followupCode: string;
  userDefined1: string;
  userDefined2: string;
  userDefined3: string;
  userDefined4: string;
  userDefined5: string;
  userDate1: string;
  userDate2: string;
  userDate3: string;
  userDate4: string;
  userDate5: string;
  seqMembId: number;
  seqGroupId: number;
  seqProvId: number;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  noteWinId: string;
  priority: string;
  consolidateType: string;
}
