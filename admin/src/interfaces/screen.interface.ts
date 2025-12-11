export interface IScreen {
    id: string;
    name: string;
    theater: string; // tên rạp (có thể bỏ nếu không cần)
    theaterId: string; // khóa ngoại liên kết với bảng theaters
    capacity: number;
    type: '2D' | '3D' | 'IMAX' | '4DX';
    status: 'Đang hoạt động' | 'Ngừng hoạt động';
}

export interface InitialScreenState {
    screens: IScreen[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
    screenCurrent: IScreen | null;
}
