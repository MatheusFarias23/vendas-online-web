export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}
//Interface que define o formato esperado da resposta de login:
//"accessToken" token de autentificação.