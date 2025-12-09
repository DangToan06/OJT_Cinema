import EventCard from './EventCard';

const events = [
    {
        id: 1,
        image: 'https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019357.jpg&w=256&q=75',
    },
    {
        id: 2,
        image: 'https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019342.jpg&w=256&q=75',
    },
    {
        id: 3,
        image: 'https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0019511.jpg&w=256&q=75',
    },
];

export default function EventList() {
    return (
        <div className="flex flex-col gap-4">
            {events.map((e) => (
                <EventCard key={e.id} image={e.image} id={e.id} />
            ))}
        </div>
    );
}
