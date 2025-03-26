import { useState, useEffect } from "react";

const GiveawayItems = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    // Mock data (Replace with API call)
    useEffect(() => {
        const mockItems = [
            { id: 1, name: "Laptop", description: "A working laptop for students.", image: "https://via.placeholder.com/150" },
            { id: 2, name: "Clothes", description: "Gently used clothes for kids.", image: "https://via.placeholder.com/150" },
            { id: 3, name: "Books", description: "Educational books for learning.", image: "https://via.placeholder.com/150" },
        ];
        setItems(mockItems);
        setFilteredItems(mockItems);
    }, []);

    // Filter items based on search
    useEffect(() => {
        setFilteredItems(
            items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, items]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center">Available Giveaway Items</h2>
            <p className="text-lg text-center mt-2">Find free items and request what you need.</p>

            {/* Search Bar */}
            <div className="mt-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-3">{item.name}</h3>
                            <p className="text-gray-600">{item.description}</p>
                            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Request Item
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No items found.</p>
                )}
            </div>
        </div>
    );
};

export default GiveawayItems;
