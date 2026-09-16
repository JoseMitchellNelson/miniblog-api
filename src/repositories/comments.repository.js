const db=require('../config/db');
async function findAll(){return(await db.query(`SELECT c.id,c.post_id,c.author_id,c.content,c.created_at,json_build_object('id',a.id,'name',a.name,'email',a.email) AS author FROM comments c JOIN authors a ON a.id=c.author_id ORDER BY c.created_at DESC`)).rows;}
async function create({post_id,author_id,content}){return(await db.query('INSERT INTO comments(post_id,author_id,content) VALUES($1,$2,$3) RETURNING id,post_id,author_id,content,created_at',[post_id,author_id,content.trim()])).rows[0];}
module.exports={findAll,create};
