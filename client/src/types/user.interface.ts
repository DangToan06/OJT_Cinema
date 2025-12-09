import type { ID, RoleName } from './enums';

/**
 * Vai trò người dùng (admin hoặc user)
 */
export interface Role {
  id: ID;
  roleName: RoleName;
}

/**
 * Thông tin người dùng trong hệ thống: dùng cho login, hiển thị avatar, đặt vé…
 */
export interface User {
  id: ID;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  passwordHash?: string; // lưu mật khẩu đã mã hóa
  avatarUrl?: string;
  address?: string;
  status?: 'ACTIVE' | 'BLOCKED';
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Dữ liệu khi tạo tài khoản user mới
 */
export interface UserCreateDTO {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password: string;
}

/**
 * Dữ liệu khi cập nhật thông tin cá nhân
 */
export interface UserUpdateDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  address?: string;
}
