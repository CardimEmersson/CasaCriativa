const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./ws.db")

db.serialize(function(){
    //CRIAR TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );`)
    //INSERIR DADOS NA TABELA
    // const query = `INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES(?,?,?,?,?);`
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere explicabo quod maiores at minusaut fuga fugiat","#"
    // ]
    // db.run(query, values, function(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log(this)
    // })
    
    //CONSULTAR DADOS NA TABELA
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log(rows)
    // })
    //DELETAR UM DADO NA TABELA
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("deletado")
    // })
})

module.exports = db //exportando