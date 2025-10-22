//Esse arquivo é basicamente um atalho para usar o 'localStorage' do navegador.

export const setItemStorage = (key: string, value: string) => localStorage.setItem(key, value);
//"export const setItemStorage" função para salvar um valor no 'localStorage' do navegador.
//"localStorage.setItem(key, value)" salva o valor no navegador.

export const removeItemStorage = (key: string) => localStorage.removeItem(key);
//"removeItemStorage" função para apagar um valor do 'localStorage'.
//"localStorage.removeItem(key)" remova a chave e o valor salvos.

export const getItemStorage = (key: string) => localStorage.getItem(key);
//"getItemStorage" função para buscar um valor no 'localStorage', retorna o valor ou null se não existir.
