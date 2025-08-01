export function ErrorMessage(msg: string){
  try{
    const temp = JSON.parse(msg) as {error:string, message:string};
    if(temp.error){
      return temp.error;
    }
    if(temp.message){
      return temp.message;
    }  
    return msg;
  }catch(e){
    return msg;
  }
}