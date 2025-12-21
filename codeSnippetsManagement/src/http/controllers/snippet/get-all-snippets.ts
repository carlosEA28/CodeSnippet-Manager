import {Request,Response} from 'express'
import {makeGetAllSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllSnippetsUseCase.js";

export async function getAllSnippets(req:Request, res:Response) {
    const snippetUseCase = await makeGetAllSnippetsUseCase()
    
    try {
        const snippets = await snippetUseCase.execute()

        res.status(200).send(snippets)
    }catch (e) {
        res.status(500).send(e)
        throw e

    }
}