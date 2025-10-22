export enum MethodsEnum {
  GET = 'get',
  DELETE = 'delete',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}
//No TypeScript, um 'enum' (abreviação de enumeration) é uma forma de criar um conjunto de valores nomeados, geralmente constantes, que você pode usar no código para evitar "strings magicas" ou números soltos espalhados. Ele serve para:
//1 - organizar valores fixos em um único lugar.
//2 - evitar error de digitação -- se você escrever errado "POTS" em vez de "POST", o TypeScript vai avisar.
//3 - dar significado aos valores -- em vez de ver "GET" solto no código, você vê 'MethodsEnum.GET, que é mais descritivo.
