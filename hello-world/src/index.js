
export default async function helloWorld() {
  const capitalize = (await import(/* webpackChunkName: "capitalize4" */ 'lodash.capitalize')).default;

  const msg = 'hello world';
  return capitalize(msg);
}
