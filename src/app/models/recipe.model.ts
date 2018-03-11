export class Recipe {
  public title: string;
  public subtitle: string;
  public price: number;
  public discount: number;
  public currency: string;
  public payment: string;
  public customerId: string;

  public constructor(
    _title: string, _subtitle: string, _price: number, _discount: number, _currency: string, _payment: string, _customerId
  ) {
    this.title = _title;
    this.subtitle = _subtitle;
    this.price = _price;
    this.discount = _discount;
    this.currency = _currency;
    this.payment = _payment;
    this.customerId = _customerId;
  }
}
