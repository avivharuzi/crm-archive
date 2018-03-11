export class Company {
  public name: any;
  public number: number;
  public image: any;
  public username: any;
  public password: any;
  public country: any;
  public countryImage: any;
  public city: any;
  public street: any;

  public constructor(
    _name, _number, _image, _username, _password, _country, _countryImage, _city, _street
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
