import { useEffect } from "react";
type Text = {
  title?: string;
  content?: string;
  setOpen: boolean;
  onClose: () => void;
};
export default function DetailModal({
  title,
  content,
  setOpen,
  onClose,
}: Text) {
    title?: string,
    content?: string,
    setOpen: boolean,
    onClose: () => void,
}
export default function DetailModal({ title, content, setOpen, onClose }: Text) {
  useEffect(() => {
    document.body.style.overflow = setOpen ? "hidden" : "auto";
  }, [setOpen]);

  return (
    <>
      {/* MODAL */}
      {setOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Box */}
          <div className="relative z-10 w-[70%] max-w-3xl bg-[#1c1f26] text-white rounded-xl p-6 shadow-xl">
            {/* Close */}
            <button
              className="absolute top-3 right-4 text-3xl hover:scale-110"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            {/* Content */}
            <div className="text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
