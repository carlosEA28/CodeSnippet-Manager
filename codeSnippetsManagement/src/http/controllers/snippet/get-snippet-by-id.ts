import {Request,Response} from 'express'
import {makeGetAllSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllSnippetsUseCase.js";
import {makeGetPublicSnippetByLanguage} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByLanguage.js";

export async function getSnippetById(req:Request, res:Response) {
    const {id} = req.params
    const snippetUseCase = await makeGetPublicSnippetByLanguage()
    
    try {
        const snippets = await snippetUseCase.execute(id)

        res.status(200).send(snippets)
    }catch (e) {
        res.status(500).send(e)
        throw e

    }
}