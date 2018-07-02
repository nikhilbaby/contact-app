export class NewUser {
  constructor(
              public firstname: String,
              public lastname: String,
              public email: String,
              public phone: String,
              public organization?: String,
              public title?: String,
              public description?: String,
              public image_url?: String,
  ) {}
}

export class Email {
  constructor(public email: String
  ) {}
}
