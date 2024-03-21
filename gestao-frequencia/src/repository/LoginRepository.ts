interface responseMock {
    username:string;
    password:string;
}
export class LoginRepository {

    //TODO - conectar com o BD
    validateUser = async ({username, password}:responseMock) =>{
        const data = {
            username:'teste@teste.com',
            password:'teste'
        }
        if(data.username === username && data.password === password)

        return true;
    }
}