export class CustomerSelectLookup {

    public static CUSTOMER_SELECT_DEFAULT = [
        {headerName: 'Customer Type', field: 'pmbArCustomerMasterPrimaryKey.customerType', width: 140, headerClass: 'font-weight-bold',filter:'agTextColumnFilter', filterParams: {
            textCustomComparator:''} },
        {headerName: 'Customer Id', field: 'pmbArCustomerMasterPrimaryKey.customerId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Short Name', field: 'shortName', width: 180, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 1', field: 'customerName1', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 2', field: 'customerName2', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Address 1', field: 'customerAddrLine1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Address 2', field: 'customerAddrLine2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Customer City', field: 'customerCity', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Customer State', field: 'customerState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Postal Code', field: 'customerPostalCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'User Eff Flag', field: 'useEftFlg', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Country', field: 'country', width: 140, headerClass: 'font-weight-bold'}];

    public static CUSTOMER_SELECT_ALL = [
        {headerName: 'CustomerType', field: 'pmbArCustomerMasterPrimaryKey.customerType', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Id', field: 'pmbArCustomerMasterPrimaryKey.customerId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Short Name', field: 'shortName', width: 180, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 1', field: 'customerName1', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 2', field: 'customerName2', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Address 1', field: 'customerAddrLine1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Address 2', field: 'customerAddrLine2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Customer City', field: 'customerCity', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Customer State', field: 'customerState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Postal Code', field: 'customerPostalCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'User Eff Flag', field: 'useEftFlg', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Country', field: 'country', width: 140, headerClass: 'font-weight-bold'}];
}
