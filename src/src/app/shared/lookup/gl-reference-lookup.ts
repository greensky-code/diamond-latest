export class GlReferenceLookup {

    public static DEFAULT = [
        {headerName: 'Company Code', field: 'companyCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Gl Ref Code', field: 'generalLedgerReferencePrimaryKey.glRefCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Debit Gl Number 1', field: 'debitGlNumber1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Credit Gl Number 1', field: 'creditGlNumber1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Debit Gl Number 2', field: 'debitGlNumber2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Credit Gl Number 2', field: 'creditGlNumber2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Datetime', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Int Debit Gl Number', field: 'intDebitGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Int Credit Gl Number', field: 'intCreditGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dscnt Debit Gl Number', field: 'dscntDebitGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dscnt Credit Gl Number', field: 'dscntCreditGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Date 1', field: 'userDate1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Date 2', field: 'userDate2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Penalty Expense', field: 'penaltyExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Penalty Payable', field: 'penaltyPayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adv Pay Prepaid', field: 'advPayPrepaidExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adv Pay Payable', field: 'advPayPayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Incentive Expense', field: 'incentiveExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Incentive Payable', field: 'incentivePayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adm Fee Expense', field: 'admFeeExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adm Fee Payable', field: 'admFeePayableAcc', width: 140, headerClass: 'font-weight-bold'}
    ];

    
    
    public static ALL = [
        {headerName: 'Company Code', field: 'companyCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Gl Ref Code', field: 'generalLedgerReferencePrimaryKey.glRefCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Debit Gl Number 1', field: 'debitGlNumber1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Credit Gl Number 1', field: 'creditGlNumber1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Debit Gl Number 2', field: 'debitGlNumber2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Credit Gl Number 2', field: 'creditGlNumber2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Datetime', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Int Debit Gl Number', field: 'intDebitGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Int Credit Gl Number', field: 'intCreditGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dscnt Debit Gl Number', field: 'dscntDebitGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dscnt Credit Gl Number', field: 'dscntCreditGlNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Date 1', field: 'userDate1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Date 2', field: 'userDate2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Penalty Expense', field: 'penaltyExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Penalty Payable', field: 'penaltyPayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adv Pay Prepaid', field: 'advPayPrepaidExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adv Pay Payable', field: 'advPayPayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Incentive Expense', field: 'incentiveExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Incentive Payable', field: 'incentivePayableAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adm Fee Expense', field: 'admFeeExpenseAcc', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Adm Fee Payable', field: 'admFeePayableAcc', width: 140, headerClass: 'font-weight-bold'}
    ];


}
