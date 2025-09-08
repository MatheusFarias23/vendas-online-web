import type { UserType } from './UserType';

export interface AuthType {
  accessToken: string;
  user: UserType;
}
//'AuthType' é como se fosse um molde da resposta do login: um token + dados do usuário.
