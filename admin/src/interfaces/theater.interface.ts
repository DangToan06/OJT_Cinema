export interface StatusButtonProps {
    status: string;
    onToggle: () => void;
}

export interface ITheater {
    name: string;
    address: string;
    phone: string;
    website: string;
    screens: number;
    status: 'Đang hoạt động' | 'Ngừng hoạt động';
    id: string;
}

export interface InitialTheaterState {
    theaters: ITheater[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
    theaterCurrent: ITheater | null;
}

export interface UpdateStatusData {
    id: string;
    status: 'Đang hoạt động' | 'Ngừng hoạt động';
}


