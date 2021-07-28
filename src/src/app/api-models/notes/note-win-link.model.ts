/* Copyright (c) 2020 . All Rights Reserved. */

export class NoteWinLink {


    linkContext: string;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    languageId: number;


    noteWinLinkPrimaryKey: {
        linkWinId: string,
        noteType?: string,
        winId?: string
    }

    secWinDescr: null
    secWinDescrLanguageId: null

}