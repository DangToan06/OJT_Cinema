export interface IScreen {
    id: string;
    name: string;
    theater: string;
    theaterId: string;
    type: 'Mini' | 'Standard' | 'IMAX' | 'Large'|null;
    capacity: number;
    row: number;
    column: number;
    status: 'Đang hoạt động' | 'Ngừng hoạt động';
}

export interface InitialScreenState {
    screens: IScreen[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
    screenCurrent: IScreen | null;
}

export const SCREEN_TYPE_LIMITS = {
    Mini: { minRow: 3, maxRow: 4, minCol: 5, maxCol: 6 },
    Standard: { minRow: 5, maxRow: 6, minCol: 8, maxCol: 10 },
    IMAX: { minRow: 6, maxRow: 8, minCol: 12, maxCol: 14 },
    Large: { minRow: 8, maxRow: 10, minCol: 14, maxCol: 18 },
};
