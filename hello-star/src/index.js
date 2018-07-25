
export default async function helloStar() {
  const capitalize = (await import(/* webpackChunkName: "capitalize3" */ 'lodash.capitalize')).default;
  const msg = 'hello star';
  return capitalize(msg);
}
