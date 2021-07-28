import {SecWin} from "../../api-models/security/sec-win.model";
import {SecUser} from "../../api-models/security/sec-user.model";
import {SecWinDescr} from "../../api-models/security/sec-win-descr.model";

export class SecWinViewModel {
    userId: string;
    winId: string;
    pSel: string;
    pIns: string;
    pUpd: string;
    pDel: string;
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
    secWinPrimaryKey: { winId: string, userId: string }


    constructor(secWin: SecWin) {
        this.userId = secWin.userId;
        this.winId = secWin.winId;
        this.pSel = secWin.psel;
        this.pIns = secWin.pins;
        this.pUpd = secWin.pupd;
        this.pDel = secWin.pdel;
        this.maxOpen = secWin.maxOpen;
        this.insertDatetime = secWin.insertDatetime;
        this.insertProcess = secWin.insertProcess;
        this.updateDatetime = secWin.updateDatetime;
        this.updateUser = secWin.updateUser;
        this.updateProcess = secWin.updateProcess;
        this.languageId = secWin.languageId;

        this.secUser = secWin.secUser;
        this.secWinDescr = secWin.secWinDescr;
        this.secWinPrimaryKey = secWin.secWinPrimaryKey;
    }

    public hasSelectPermission(): boolean {
        return this.pSel === 'Y';
    }

    public hasInsertPermission(): boolean {
        return this.pIns === 'Y';
    }

    public hasUpdatePermission(): boolean {
        return this.pUpd === 'Y';
    }

    public hasDeletePermission(): boolean {
        return this.pDel === 'Y';
    }

}
