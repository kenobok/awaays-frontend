import { useState } from 'react';


const GiveawayItemDetails = () => {

    return (
        <main>
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-bold text-center">Laptop</h2>
                <p className="text-lg text-center mt-2">A working laptop for students.</p>

                <div className="mt-6 flex justify-center">
                    <img src="https://via.placeholder.com/400" alt="Laptop" className="w-1/2 object-cover rounded-lg" />
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Request Item
                    </button>
                </div>
            </div>
        </main>
    )
}


export default GiveawayItemDetails;
