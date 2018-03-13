export class Company {
  public name: string;
  public number: number;
  public image: any;
  public username: string;
  public password: string;
  public country: string;
  public countryImage: string;
  public city: string;
  public street: string;

  public constructor(
    _name: string, _number: number, _image: any, _username: string, _password: string, _country: string, _countryImage: string, _city: string, _street: string
  ) {
    this.name = _name;
    this.number = _number;
    this.image = _image;
    this.username = _username;
    this.password = _password;
    this.country = _country;
    this.countryImage = _countryImage;
    this.city = _city;
    this.street = _street;
  }
}
