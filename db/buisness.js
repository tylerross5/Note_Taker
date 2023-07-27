const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class buisness{
  read(){
    return readFileAsync('db/db.json', 'utf8')
  }
write(note){
  return writeFileAsync('db/db.json', JSON.stringify(note))
}
get(){
  return this.read()
  .then((notes)=>{
    let Notes;
  try{
    Notes= [].concat(JSON.parse(notes))
  }catch(err){
    Notes=[]
  }
  return Notes
  })
}
post(note){
  const {title, text}= note

  if(!title || !text){
    throw new Error("Cannot leave these options blank")
  }
  const newnote={title, text, id: uuidv1};
  return this.get()
  .then((notes)=>[...notes,newnote])
  .then((NewNote)=>this.write(NewNote))
  .then(()=>newnote)
}
delete(id){
  return this.get()
    .then((notes)=> notes.filter((note)=>note.id !== id))
    .then((filternotes)=>this.write(filternotes))
  
}

}
module.exports=new buisness
