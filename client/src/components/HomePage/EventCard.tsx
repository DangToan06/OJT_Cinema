interface EventCardProps {
    id: number;
    image: string;
}

export default function EventCard({ id, image }: EventCardProps) {
    return (
        <div
            key={id}
            className="rounded-lg overflow-hidden bg-[#111316] p-3 shadow-lg hover:shadow-xl transition cursor-pointer"
        >
            <img
                src={image}
                className="w-full h-24 object-cover rounded-md transition-transform duration-300 hover:scale-105"
            />
        </div>
    );
}
