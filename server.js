//npm init -y: -y=yes 
//npm i express: instalar o express para criar o servidor
//npm i nodemon: instalar o nodemon para ficar atualizando o servidor   !atualizar o package
//npm i nunjucks: template engine
//npm i sqlite3: banco de dados

const express = require("express")
const server = express()

const db = require("./db") //importando banco de dados

//configurar arquivos estaticos
server.use(express.static("public"))
// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //
})

//rotas
server.get("/", function(req,res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (idea of reversedIdeas){
            if(lastIdeas.length<2){
                lastIdeas.push(idea)
            }
        }
        // return res.sendFile(__dirname + "/index.html")  
        return res.render("index.html", {ideas: lastIdeas}) //com o nunjucks
        //__dirname pega o todo o caminho até a pasta
        })
})
server.get("/excluir", function(req,res){
    //DELETAR UM DADO NA TABELA
    db.run(`DELETE FROM ideas WHERE id = ?`, [req.query.idIdea], function(err){
        if(err){
            return console.log(err)
        }
        
        return res.redirect("/ideias")
    })
})



server.get("/ideias", function(req,res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            return console.log(err)//TODO fazer pag de error
        }
        const reversedIdeas = [...rows].reverse()
        // return res.sendFile(__dirname + "/ideias.html")   
        return res.render("ideias.html", {ideas: reversedIdeas})    //com o nunjucks
        //__dirname pega o todo o caminho até a pasta
    })

})

server.post("/", function(req, res){
    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err){
        if(err){
            console.log(err)
            return res.render("index.html", {error: true}) 
        }
        return res.redirect("/ideias")
    })
})


server.listen(3000) //servidor vai ouvir a porta 3000