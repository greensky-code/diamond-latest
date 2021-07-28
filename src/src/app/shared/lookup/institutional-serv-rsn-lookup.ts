export class InstitutionalServRsnLookup {
    public static DEFAULT = [
        {headerName: 'Reason Code', field: 'reasonCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 300, headerClass: 'font-weight-bold'}
    ];

    public static ALL = [
        {headerName: 'Reason Code Type', field: 'reasonCodeType', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 300, headerClass: 'font-weight-bold'},
        {headerName: 'Auto Audit LOC Cod', field: 'autoAuditLocCod', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Datetime', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', width: 140, headerClass: 'font-weight-bold'}
    ];
}
