export class EmployeeData {

    id: number;
    login: string;
    firstName: string;
    secondName: string;
    image: string;
    password: string;
    
}

export class User{
    
    constructor(id: number, login: string){
        this.id = id;
        this.login = login;
    }

    id: number;
    login: string;
}