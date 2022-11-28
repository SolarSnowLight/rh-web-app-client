export default class AuthDataDto {
    access_token;

    constructor(model) {
        this.access_token = model.access_token;
    }
}