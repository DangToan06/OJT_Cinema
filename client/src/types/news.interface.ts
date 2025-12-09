import type { ID } from './enums';

/**
 * Tin tức & khuyến mãi của hệ thống
 */
export interface News {
  id: ID;
  title: string;
  summary?: string;
  content?: string;
  bannerUrl?: string;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
