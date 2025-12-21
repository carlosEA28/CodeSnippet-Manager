import {makeGetPublicSnippetByTitle} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByTitle.js";
import {Request,Response} from "express";
export async function getAllPublicSnippetsByTitle(req: Request, res: Response) {

    const { title} = req.body
    const snippetsUseCase = await makeGetPublicSnippetByTitle()

    try{
        const snippets = await snippetsUseCase.execute(title)
        res.status(200).send(snippets)
    }catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}