const mockItems = [
    { 
        id: 1, 
        purpose: "Support Awaays", 
        name: "Laptop", 
        description: "A fully functional laptop suitable for students or professionals. It is in great condition and can handle basic tasks such as browsing, word processing, and online learning.",
        instruction: "This laptop must be used for educational or work purposes only. Reselling or misusing it for non-constructive activities is strictly discouraged.",
        country: "United States",
        state: "Alabama",
        images: [
            "https://images.pexels.com/photos/20595040/pexels-photo-20595040/free-photo-of-sofa-on-sidewalk-in-city.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/5192057/pexels-photo-5192057.jpeg?auto=compress&cs=tinysrgb&w=600",
        ]
    },
    { 
        id: 2,
        purpose: "Prison Outreach",
        name: "Clothes", 
        description: "A variety of gently used clothes, including shirts, trousers, and jackets, suitable for children and adults in need. All items have been cleaned and are in wearable condition.",
        instruction: "These clothes are meant to be distributed to individuals in correctional facilities or struggling communities. Ensure fair distribution to those who truly need them.",
        country: "Afghanistan",
        state: "Khost", 
        images: [
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600", 
        ]
    },
    { 
        id: 3,
        purpose: "Educational Aid",
        name: "Books", 
        description: "A diverse collection of educational books covering subjects such as science, mathematics, literature, and personal development. Suitable for students, teachers, and anyone eager to learn.",
        instruction: "These books should be used to enhance knowledge and skills. They must not be resold but rather passed on to other learners when no longer needed.",
        country: "United Kingdom",
        state: "London",
        images: [
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 4, 
        purpose: "Sustainable Transport",
        name: "Bicycle", 
        description: "A well-maintained bicycle, perfect for daily commuting, exercise, or leisure riding. It has smooth gears and strong brakes, making it reliable and easy to use.",
        instruction: "This bicycle should be used for practical transportation, fitness, or community service. If no longer needed, consider donating it to another person in need.",
        country: "Netherlands",
        state: "Utrecht",
        images: [
            "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 5, 
        purpose: "Connectivity & Communication",
        name: "Mobile Phone", 
        description: "A working smartphone with essential features such as calling, texting, and internet access. Ideal for staying connected, accessing online resources, or emergency communication.",
        instruction: "This phone is intended for individuals in need of a communication device. It should be used responsibly and not for any illegal or unethical activities.",
        country: "Nigeria",
        state: "Lagos",
        images: [
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600", 
        ]
    },
    { 
        id: 6, 
        purpose: "Home Essentials",
        name: "Furniture", 
        description: "A sturdy wooden study table in great condition, ideal for students, freelancers, or anyone in need of a workspace at home.",
        instruction: "This furniture should be used for studying or working. If no longer needed, consider giving it to another person in need of a study space.",
        country: "Canada",
        state: "Ontario",
        images: [
            "https://images.pexels.com/photos/695682/pexels-photo-695682.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 7, 
        purpose: "Child Development",
        name: "Toys", 
        description: "A set of interactive and educational toys designed to enhance creativity, motor skills, and problem-solving abilities in young children.",
        instruction: "These toys should be used for children’s learning and playtime. Parents or caregivers must ensure they are used safely and appropriately.",
        country: "Germany",
        state: "Berlin",
        images: [
            "https://images.pexels.com/photos/5192057/pexels-photo-5192057.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600", 
        ]
    },
    { 
        id: 8, 
        purpose: "Household Items",
        name: "Kitchen Utensils", 
        description: "A collection of essential kitchen items, including pots, plates, and cutlery. Perfect for families, students, or individuals setting up a new home.",
        instruction: "These utensils are meant for cooking and dining purposes. They should be handled with care and passed on to others when no longer needed.",
        country: "India",
        state: "Delhi",
        images: [
            "https://images.pexels.com/photos/3965544/pexels-photo-3965544.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 9, 
        purpose: "School Essentials",
        name: "School Bag", 
        description: "A spacious and durable backpack designed for students of all ages. It has multiple compartments for books, stationery, and personal items.",
        instruction: "This school bag should be used by students who need it for carrying their school supplies. Do not misuse or sell it.",
        country: "Kenya",
        state: "Nairobi",
        images: [
            "https://images.pexels.com/photos/5920759/pexels-photo-5920759.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 10, 
        purpose: "Clothing Assistance",
        name: "Shoes", 
        description: "A pair of gently worn sneakers in good condition. Suitable for casual wear, sports, or school use.",
        instruction: "These shoes should be given to someone who needs them. If they no longer fit or are not needed, pass them on to another person in need.",
        country: "South Africa",
        state: "Cape Town",
        images: [
            "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600", 
            "https://images.pexels.com/photos/5920759/pexels-photo-5920759.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
];

export default mockItems;
