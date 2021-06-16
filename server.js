const express = require('express')
const app = express()
app.use(express.json());

app.listen(3000, function(){
    console.log("rodando na porta 3000")
})

let candidates = [];

const checkPercentageOfMatchesBetweenTwoArrays = (first, second) => {
    const count = first.reduce((acc, val) => {
        if (second.includes(val)){
            return ++acc;
        };
        return acc;
    }, 0);
    return (count / first.length) * 100;
};

app.post('/candidate', (req, res) => {
    candidates.push(req.body)
    console.log(candidates)
    res.status(201).send(req.body)
})


app.get('/candidates/search', (req, res) => {
    let skills = req.query.skills.split(",")

    let candidatesPlusPercentageOfMatchesDictionary = [];  
    for (let i = 0; i < candidates.length; i++) {
        candidatesPlusPercentageOfMatchesDictionary.push({ candidate: candidates[i], percentage: checkPercentageOfMatchesBetweenTwoArrays(skills, candidates[i].skills) })
    }
    
    let candidatesWithMaxPercentageOfMatches = [];
    candidatesWithMaxPercentageOfMatches = candidatesPlusPercentageOfMatchesDictionary.filter(o => o.percentage != 0 && o.percentage === Math.max.apply(Math, candidatesPlusPercentageOfMatchesDictionary.map(o => o.percentage)))

    if (candidatesWithMaxPercentageOfMatches.length == 0) res.status(404).send({ message: "no candidate was found with provided skill" })
    if (candidatesWithMaxPercentageOfMatches.length == 1) res.status(200).send({ id: candidatesWithMaxPercentageOfMatches[0].candidate.id, nome: candidatesWithMaxPercentageOfMatches[0].candidate.nome, skills: candidatesWithMaxPercentageOfMatches[0].candidate.skills })
    if (candidatesWithMaxPercentageOfMatches.length >= 2) res.status(200).send({ message: "two or more candidates were found with same matched skills" })            
})




app.get('/test', (req, res) => {
    
    let array = [-1, -1, -1, 3, 5, -2, 8]
    let saldo = 0
    let count = 0;

    for (let i = 0; i < array.length; i++) { 

        saldo = saldo + array[i]
        
        //console.log("saldo =>" + saldo)

        if (saldo < 0 && array[i] < 0) {            
            //console.log("indice =>" + i)
            count = count + 1
            saldo = saldo - array[i]
        }
         
    }

    console.log("movimentacoes necessarias para manter um saldo positivo em sequencia =>" + count)

    res.sendStatus(200)
})




