const router=require('express').Router();
const buisness=require('../db/buisness')

router.get('/notes', (req,res)=>{
  buisness.get()
  .then((notes)=>{
    return res.json(notes);
  })
})
router.post('/notes',(req,res)=>{
  buisness.post(req.body)
  .then((note)=>res.json(note))
  .catch((err)=>res.status(400).json(err));
})
router.delete('/notes/:id',(req,res)=>{
  buisness.delete(req.params.id)
  .then(()=>res.json({ok:true}))
  .catch((err)=>res.status(400).json(err))
})
module.exports=router;