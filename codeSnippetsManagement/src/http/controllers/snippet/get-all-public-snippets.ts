import {Request,Response} from 'express'
import {makeGetPublicSnippetByLanguage} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByLanguage.js";
import {makeGetPublicSnippetByTag} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByTag.js";
import {makeGetPublicSnippetByTitle} from "../../../use-cases/factories/snippet/makeGetPublicSnippetByTitle.js";
import {makeGetRecentSnippets} from "../../../use-cases/factories/snippet/makeGetRecentSnippets.js";
import {makeGetAllPublicSnippetsUseCase} from "../../../use-cases/factories/snippet/makeGetAllPublicSnippetsUseCase.js";


export async function getAllSnippets(req: Request, res: Response) {
    const { language, tag, search, recent } = req.query;

    try {
        let snippets;

        if (language && typeof language === 'string') {
            const useCase = await makeGetPublicSnippetByLanguage();
            snippets = await useCase.execute(language);
        }
        else if (tag && typeof tag === 'string') {
            const useCase = await makeGetPublicSnippetByTag();
            snippets = await useCase.execute(tag);
        }
        else if (search && typeof search === 'string') {
            const useCase = await makeGetPublicSnippetByTitle();
            snippets = await useCase.execute(search);
        }
        else if (recent === 'true') {
            const useCase = await makeGetRecentSnippets();
            snippets = await useCase.execute();
        }
        else {
            const useCase = await makeGetAllPublicSnippetsUseCase();
            snippets = await useCase.execute();
        }

        return res.status(200).send(snippets);
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: 'Internal server error' });
    }
}