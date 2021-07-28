export class InstitutionalBillTypeLookup {
    public static DEFAULT = [
        {headerName: 'Bill Type', field: 'billType', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 300, headerClass: 'font-weight-bold'},
        {headerName: 'IP/OP', field: 'inpOutpInd', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'POS', field: 'placeOfSvcMaster.placeOfSvcCode', width: 140, headerClass: 'font-weight-bold'}
    ];

    public static ALL = [
        {headerName: 'Description', field: 'description', width: 300, headerClass: 'font-weight-bold'},
        {headerName: 'IP/OP', field: 'inpOutpInd', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'POS', field: 'placeOfSvcMaster.placeOfSvcCode', width: 140, headerClass: 'font-weight-bold'}
    ];
}
