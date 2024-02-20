export class LoginModel {
    email: string;
    password: string;
    userId: string;

    constructor() {
        this.email = '',
        this.password = '',
        this.userId = ''
    }
}