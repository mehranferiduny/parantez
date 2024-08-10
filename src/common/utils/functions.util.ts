export const createSlug = (str: string) => {
  return str.replace(/[،ًًًٌٍُِ\.\+\-_)(*&^%$#@!~'";:؟?><«»`ء]+/g, '')?.replace(/[\s]+/g, '-');
}