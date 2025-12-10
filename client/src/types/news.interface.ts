/**
 * Tin tức & khuyến mãi của hệ thống
 */
export interface News {
<<<<<<< HEAD
    id: ID;
=======
    id: string;
>>>>>>> develop
    title: string; // Tiêu đề bài viết
    content: string; // Nội dung chi tiết
    created_at: string; // Ngày đăng (ISO format)
    updated_at: string; // Ngày cập nhật (ISO format)
<<<<<<< HEAD
    bannerUrl: string; // Ảnh banner của bài viết
=======
    bannerUrl: string;
    category: 'news' | 'promotion';
>>>>>>> develop
}
