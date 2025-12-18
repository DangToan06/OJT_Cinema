import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Plus, Theater, AlertTriangle } from "lucide-react";
import {
  initialTheater,
  type ITheater,
  type InitialTheaterState,
} from "../interfaces/theater.interface";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
  createTheater,
  deleteTheater,
  getAllTheaters,
  updateStatusTheater,
  updateTheater,
} from "../api/theater.api";
import { notify } from "../util/toast";
import TheaterCard from "../components/TheaterCard";
import ModalAddTheater from "../components/ModalAddTheater";

export function TheatersManagement() {
  const dataTheaters: InitialTheaterState = useAppSelector((s) => s.theater);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (dataTheaters.theaters.length === 0) {
      dispatch(getAllTheaters());
    }
  }, [dispatch, dataTheaters.theaters.length]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] =
    useState<Omit<ITheater, "id">>(initialTheater);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [theaterToDelete, setTheaterToDelete] = useState<ITheater | null>(null);
  const [theaterToEdit, setTheaterToEdit] = useState<ITheater | null>(null);

  const handleDeleteClick = (theater: ITheater) => {
    setTheaterToDelete(theater);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (theaterToDelete) {
      dispatch(deleteTheater(theaterToDelete.id));
      notify.success("Xóa rạp chiếu phim thành công");
      setIsDeleteModalOpen(false);
      setTheaterToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTheaterToDelete(null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTheater = {
      id: uuidv4(),
      ...formData,
      screens: Number(formData.screens),
    };
    if (theaterToEdit) {
      newTheater.id = theaterToEdit.id;
      setTheaterToEdit(null);
      dispatch(updateTheater(newTheater));
      notify.success("Cập nhật rạp chiếu phim thành công");
    } else {
      dispatch(createTheater(newTheater));
      notify.success("Thêm rạp chiếu phim thành công");
    }
    setIsModalOpen(false);
    setFormData(initialTheater);
  };

  const toggleStatus = (id: string) => {
    dispatch(
      updateStatusTheater({
        id,
        status:
          dataTheaters.theaters.find((theater) => theater.id === id)?.status ===
          "Đang hoạt động"
            ? "Ngừng hoạt động"
            : "Đang hoạt động",
      })
    );
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      {" "}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-200 mb-2 font-bold text-2xl">
                Quản lý rạp chiếu
              </h1>
              <p className="text-gray-300">
                Thêm, chỉnh sửa và quản lý thông tin rạp chiếu
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center cursor-pointer gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Thêm rạp mới
            </button>
          </div>
          {/* Theaters Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {dataTheaters.theaters.map((theater) => (
              <TheaterCard
                key={theater.id}
                theater={theater}
                toggleStatus={toggleStatus}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={() => {
                  setTheaterToEdit(theater);
                  setIsModalOpen(true);
                  setFormData({
                    name: theater.name,
                    address: theater.address,
                    phone: theater.phone,
                    website: theater.website,
                    screens: theater.screens,
                    status: theater.status,
                  });
                }}
              />
            ))}
          </div>
          {/* Add Theater Modal */}
          <ModalAddTheater
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            cancelHandle={() => {
              setTheaterToEdit(null);
              setFormData(initialTheater);
            }}
          />

          {isDeleteModalOpen && theaterToDelete && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Xác Nhận Xóa</h2>
                      <p className="text-red-100 text-sm mt-1">
                        Hành động này không thể hoàn tác
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-4">
                    Bạn có chắc chắn muốn xóa rạp chiếu phim này không?
                  </p>

                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-900/20 rounded-lg">
                        <Theater className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {theaterToDelete.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {theaterToDelete.address}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {theaterToDelete.screens} phòng chiếu
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelDelete}
                      className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 font-semibold 
                         rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
                    >
                      Hủy
                    </button>

                    <button
                      onClick={handleConfirmDelete}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-700 to-red-800
                         hover:from-red-600 hover:to-red-700 text-white font-semibold 
                         rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                    >
                      Xóa Rạp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
