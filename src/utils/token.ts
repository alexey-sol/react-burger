import Cookies from 'js-cookie';

export function isTokenExists() {
  return Boolean(Cookies.get('accessToken'));
}
