import pegaArquivo from "./index.js";
import validaURL, {geraArrayDeURL} from "./http-validacao.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;


async function processaTexto(caminhoDoArquivo){
    const resultado = await pegaArquivo(caminhoDoArquivo[2]);
    if (caminhoDoArquivo[3] != "valida" && caminhoDoArquivo[3] != "links" && caminhoDoArquivo[3] != "leitura"){
        console.log(chalk.bgWhite.red("Digite"), "\"npm run cli [valida, links, ou leitura]\" para o correto funcionamento do programa");
    }
    else{    
        if (caminhoDoArquivo[3] === "valida"){
            if (typeof(resultado) != "string"){
                console.log(chalk.bgGray.blue("Links Validados: "), await validaURL(resultado));
            }
            else{
                console.log(resultado)
            }
        }
        else if(caminhoDoArquivo[3] === "links"){
            if (typeof(resultado) != "string"){
                console.log(chalk.bgGray.blue("Lista de Links: "), geraArrayDeURL(resultado));
            }
            else{
                console.log(resultado)
            }    
        }
        else{
            const txt = await fs.promises.readFile(caminhoDoArquivo[2], 'utf-8')
            const rg =  new RegExp(/^\s+$/)
            if (rg.test(txt) || txt.length === 0){
                console.log(chalk.bgWhite.blue("O arquivo está vazio ou contém apenas espaços"))
            }
            else{
                console.log(chalk.green(txt))
            }
        }
    }        
}

processaTexto(caminho);
