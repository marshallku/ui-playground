export interface ArticleBase {
    title: string;
    uri: string;
    thumbnail: string;
}

export interface Article extends ArticleBase {
    date: string;
    dateFormat: string;
    desc: string;
    isNew: string;
}

export interface ArticleAlt extends ArticleBase {
    newTab?: boolean;
}

export interface PostAdjacentArticle extends ArticleBase {
    thumbnailSet: string;
}

export interface ResponseBase {
    version: string;
    bodyClass: string;
    thumbnail: {
        src: string;
        srcset: string;
    };
    title: string;
}

export interface HomeData extends ResponseBase {
    type: "home";
    categories: [ArticleAlt];
    pages: [ArticleAlt];
    list: Article[];
    gallery: ArticleBase[];
}

export interface ArchiveData extends ResponseBase {
    type: "category";
    categoryStyle: string;
    desc: string;
    query?: string;
    slug: string;
    list: Article[];
    paging: {
        max: number;
        currentIndex: number;
    };
}

export interface SinglePostData extends ResponseBase {
    type: "article";
    isManager?: boolean;
    date: {
        posted: string;
        modified: string;
    };
    id: number;
    desc: string;
    body: string;
    commentLength: number;
    category: {
        name: string;
        link: string;
    };
    tags: string[];
    prevPost?: PostAdjacentArticle;
    nextPost?: PostAdjacentArticle;
    relatedArticles: Article[];
}

export interface PageData extends ResponseBase {
    type: string;
    body?: string;
    isManager?: boolean;
    id: number;
    hasComments: boolean;
}
