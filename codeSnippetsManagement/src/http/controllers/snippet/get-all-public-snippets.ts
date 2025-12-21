import {makeGetAllSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllSnippetsUseCase.js";
import {Request,Response} from 'express'

export async function getAllPublicSnippets(req:Request, res:Response){

    const snippetsUseCase = await makeGetAllSnippetsUseCase()

    try {
        const snippets = await snippetsUseCase.execute()

        res.status(200).send(snippets)
    }catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}