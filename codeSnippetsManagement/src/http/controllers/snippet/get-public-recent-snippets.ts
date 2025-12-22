import {Request,Response} from 'express'
import {makeGetAllSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllSnippetsUseCase.js";
import {makeGetPublicSnippetByLanguage} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByLanguage.js";
import {makeGetRecentSnippets} from "../../../use-cases/factories/snippet/makeGetRecentSnippets.js";

export async function getPublicRecentSnippets(req:Request, res:Response) {
    const snippetUseCase = await makeGetRecentSnippets()
    
    try {
        const snippets = await snippetUseCase.execute()

        res.status(200).send(snippets)
    }catch (e) {
        res.status(500).send(e)
        throw e

    }
}