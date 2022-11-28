export default class AuthSignUpDto {
    name;
    surname;
    patronymic;
    nickname;

    constructor(model) {
        this.name = model.name;;
        this.surname = model.surname;;
        this.patronymic = model.patronymic;;
        this.nickname = model.nickname;;
    }
}