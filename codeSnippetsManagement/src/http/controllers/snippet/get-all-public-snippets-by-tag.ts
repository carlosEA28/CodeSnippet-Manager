import {Request,Response} from 'express'
import {makeGetAllSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllSnippetsUseCase.js";
import {makeGetPublicSnippetByLanguage} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByLanguage.js";
import {makeGetPublicSnippetByTag} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByTag.js";

export async function getAllPublicSnippetsByTag(req:Request, res:Response) {
    const {tag} = req.params
    const snippetUseCase = await makeGetPublicSnippetByTag()
    
    try {
        const snippets = await snippetUseCase.execute(tag)

        res.status(200).send(snippets)
    }catch (e) {
        res.status(500).send(e)
        throw e

    }
}