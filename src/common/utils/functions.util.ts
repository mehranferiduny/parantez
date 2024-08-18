export const createSlug = (str: string) => {
  return str.replace(/[،ًًًٌٍُِ\.\+\-_)(*&^%$#@!~'";:؟?><«»`ء]+/g, '')?.replace(/[\s]+/g, '-');
}

export const RandumId=()=> Math.random().toString(36).substring(2)


export const ReportText=(str:string)=>{
  const Riport=["کون","کص","کیر","تریاک"]
    const commentWords = str.split(" ");
    for (let word of commentWords) {
        if (Riport.includes(word.toLowerCase())) {
            return true;
        }
    }
    return false;


  
}