import { CreateSnippetRequestDto } from "../../dto/snippet/CreateSnippetRequestDto.js";
import { SnippetRepository } from "../../repositories/snippet-repository.js";
import { TagRepository } from "../../repositories/tag-repository.js";

export class CreateSnippetUseCase {
  constructor(
    private snippetRepository: SnippetRepository,
    private tagRepository: TagRepository,
  ) {}

  async execute(params: CreateSnippetRequestDto) {
    const snippetExists = await this.snippetRepository.findSnippetByTitle(
      params.title,
    );
    if (snippetExists) {
      throw new Error("Snippet already exists"); //fazer erro custom
    }

    if (params.tagsId) {
      const tags = await this.tagRepository.findTagsByIds(params.tagsId);
      if (tags.length !== params.tagsId.length) {
        throw new Error("One or more tags not found");
      }
    }

    const snippet = await this.snippetRepository.createSnippet({
      title: params.title,
      description: params.description,
      isPublic: params.isPublic,
      tagsId: params.tagsId,
      collectionId: params.collectionId,
      userId: params.userId,
      code: params.code,
      language: params.language,
    });
    return snippet;
  }
}
