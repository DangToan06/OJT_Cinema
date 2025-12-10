import type { ID } from './enums';

/**
 * Tin tức & khuyến mãi của hệ thống
 */
export interface News {
    id: ID;
    title: string; // Tiêu đề bài viết
    content: string; // Nội dung chi tiết
    created_at: string; // Ngày đăng (ISO format)
    updated_at: string; // Ngày cập nhật (ISO format)
    bannerUrl: string; // Ảnh banner của bài viết
}
