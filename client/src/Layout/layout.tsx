import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '../assets/image.png';
import fb from '../assets/Facebook.png';
import zalo from '../assets/Zalo.png';
import ytb from '../assets/Youtube.png';
import gp from '../assets/GG Play.png';
import as from '../assets/App store.png';
import tem from '../assets/Copyright.png';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        {
            name: 'Trang chủ',
            link: "/",
            class: "",
        },
        {
            name:'Lịch chiếu',
            link: "/movie-calendar",
            class: "lichchieu",
        },
        {
            name: 'Tin tức',
            link: "/news",
            class: "tintuc",
        },
        {
            name: 'Khuyến mãi',
            link: "#",
            class: "khuyenmai",
        },
        {
            name: 'Giá vé',
            link: "/ticketPrice",
            class: "giave",
        },
        {
            name: 'Liên hoan phim',
            link: "#",
            class: "lienhoanphim",
        }
        
    ];

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* ========================= HEADER ========================= */}
            <header className="fixed top-0 left-0 w-full bg-black h-20 z-20 flex items-center px-6 shadow-lg">
                {/* Logo */}
                <img src={logo} className="w-[60px] h-[45px]" />

                {/* Desktop Menu */}
                <nav className="lg:flex items-center gap-10 ml-10 text-white">
                    {menuItems.map((item, idx) => (
                        <span
                            key={idx}
                            className={`cursor-pointer hover:text-red-500 transition ${location.pathname === item.link ? "text-red-500" : ""}`}
                            onClick={() => {
                                navigate(item.link);
                            }}
                        >
                            {item.name}
                        </span>
                    ))}
                </nav>

                {/* Buttons desktop */}
                <div className="hidden lg:flex items-center gap-4 ml-auto">
                    <button className="h-10 px-6 border border-white rounded-full text-white">
                        Đăng ký
                    </button>
                    <button className="h-10 px-6 bg-red-500 rounded-full text-white">
                        Đăng nhập
                    </button>
                </div>
                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden ml-auto text-white cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={32} /> : <Menu size={32} />}
                </button>
            </header>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="lg:hidden bg-black text-white py-4 px-6 space-y-4 mt-20 shadow-xl">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="text-lg">
                            {item}
                        </div>
                    ))}

                    <div className="flex gap-3 pt-3">
                        <button className="flex-1 py-2 border border-white rounded-full">
                            Đăng ký
                        </button>
                        <button className="flex-1 py-2 bg-red-500 rounded-full">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            )}

            {/* ========================= CONTENT ========================= */}
            <main className="flex-1 mt-20">{children}</main>

            {/* ========================= FOOTER ========================= */}
            <footer className="bg-black text-white py-14 z-10">
                {/* MENU */}
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm md:text-base font-medium">
                        {[
                            'Chính sách',
                            'Lịch chiếu',
                            'Tin tức',
                            'Giá vé',
                            'Hỏi đáp',
                            'Liên hệ',
                        ].map((item) => (
                            <span
                                key={item}
                                className="cursor-pointer hover:text-red-500 transition"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* SOCIALS + APP STORE */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
                        {/* Social icons */}
                        <img
                            src={fb}
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        />
                        <img
                            src={zalo}
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        />
                        <img
                            src={ytb}
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        />

                        {/* Store buttons */}
                        <img
                            src={gp}
                            className="h-11 cursor-pointer hover:opacity-90"
                        />
                        <img
                            src={as}
                            className="h-11 cursor-pointer hover:opacity-90"
                        />
                        <img
                            src={tem}
                            className="h-[50px] cursor-pointer hover:opacity-90"
                        />
                    </div>

                    {/* INFORMATION */}
                    <div className="mt-12 text-center flex flex-col gap-2 text-sm md:text-base leading-relaxed opacity-90">
                        <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
                        <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
                        <p>Giấy phép số: 224/GP - TTĐT ngày 31/8/2010</p>
                        <p>
                            Địa chỉ: 87 Láng Hạ, Ba Đình, Hà Nội • Điện thoại:
                            024.35141791
                        </p>

                        <div className="flex justify-center items-center gap-2 mt-2">
                            
                            <span>&copy; 2023 By NCC • All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
