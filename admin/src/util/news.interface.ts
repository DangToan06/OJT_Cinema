/**
 * Tin tức & khuyến mãi của hệ thống
 */
export interface News {
    id: string;
    title: string;
    content: string;
    created_at: string;
    bannerUrl: string;
    category: 'news' | 'promotion';
    dayBegin: string;
    dayEnd: string;
}

export interface InitialNewsState {
    newsList: News[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
    newsCurrent: News | null;
}
