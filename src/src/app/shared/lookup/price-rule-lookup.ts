export class PriceRuleLookup {
  public static PRICE_RULE_DEFAULT = [
    {
      headerName: "Price Rule",
      field: "priceRule",
      width: 200,
      headerClass: "font-weight-bold",
    },
    {
      headerName: "Description",
      field: "description",
      width: 400,
      headerClass: "font-weight-bold",
    },
    {
      headerName: "Custom",
      field: "customTableLogic",
      width: 200,
      headerClass: "font-weight-bold",
    },
  ];

  public static PRICE_RULE_ALL = [
    {
      headerName: "Line Of Business",
      field: "lineOfBusiness",
      width: 140,
      headerClass: "font-weight-bold",
    },
    {
      headerName: "Description",
      field: "description",
      width: 140,
      headerClass: "font-weight-bold",
    },
  ];
}
