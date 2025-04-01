const mockItems = [
    { 
        id: 1, 
        purpose: "Support Awaays", 
        name: "Laptop", 
        description: "A fully functional laptop suitable for students or professionals. It is in great condition and can handle basic tasks such as browsing, word processing, and online learning.",
        instruction: "This laptop must be used for educational or work purposes only. Reselling or misusing it for non-constructive activities is strictly discouraged.",
        country: "United States",
        state: "Alabama",
        request: "5",
        donor: "",
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
        request: "12",
        donor: "",
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
        request: "83",
        donor: "",
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
        request: "194",
        donor: "Cidal Much",
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
        request: "2",
        donor: "Queen Munich",
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
        request: "",
        donor: "Hillary Clith",
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
        request: "",
        donor: "Porter Harry",
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
        request: "1",
        donor: "Ashley Pete",
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
        country: "Nigeria",
        state: "Lagos",
        request: "",
        donor: "Real Cassey",
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
        request: "7",
        donor: "Trump Hidden",
        images: [
            "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600", 
            "https://images.pexels.com/photos/5920759/pexels-photo-5920759.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 11, 
        purpose: "Remote Work Support", 
        name: "Tablet", 
        description: "A functional tablet with a touch screen, ideal for students, freelancers, and professionals for remote work or study.",
        instruction: "This device should be used for productive activities such as studying, freelancing, or work-related tasks. Not for resale.",
        country: "United States",
        state: "California",
        request: "",
        donor: "Lome Idumu",
        images: [
            "https://images.pexels.com/photos/5082571/pexels-photo-5082571.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 12, 
        purpose: "Healthcare Assistance", 
        name: "Wheelchair", 
        description: "A well-maintained wheelchair to help individuals with mobility challenges.",
        instruction: "Must be given to a person in need of mobility assistance.",
        country: "India",
        state: "Mumbai",
        request: "",
        donor: "MissKay",
        images: [
            "https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 13, 
        purpose: "Winter Relief", 
        name: "Blankets", 
        description: "Warm blankets in good condition to help people in cold weather conditions.",
        instruction: "Should be donated to homeless individuals or families struggling with winter conditions.",
        country: "Nigeria",
        state: "Lagos",
        request: "15",
        donor: "Ade Murray",
        images: [
            "https://images.pexels.com/photos/2718911/pexels-photo-2718911.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 14, 
        purpose: "Digital Learning", 
        name: "Headphones", 
        description: "A pair of noise-canceling headphones, great for online learning or remote work.",
        instruction: "Intended for students or professionals who need to focus during study or work hours.",
        country: "United Kingdom",
        state: "Manchester",
        request: "",
        donor: "rIhanna Fred",
        images: [
            "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 15, 
        purpose: "Daily Commuting", 
        name: "Bus Pass", 
        description: "A preloaded bus pass for public transportation to assist individuals commuting to work or school.",
        instruction: "Should be given to someone struggling with transportation costs.",
        country: "Germany",
        state: "Munich",
        request: "",
        donor: "Peter Welsh",
        images: [
            "https://images.pexels.com/photos/178349/pexels-photo-178349.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 16, 
        purpose: "Food Assistance", 
        name: "Grocery Package", 
        description: "A package containing essential food items such as rice, beans, and canned goods.",
        instruction: "Must be distributed to families in need, particularly those facing food insecurity.",
        country: "Nigeria",
        state: "Abuja",
        request: "",
        donor: "Simon Cowell",
        images: [
            "https://images.pexels.com/photos/5946691/pexels-photo-5946691.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 17, 
        purpose: "Medical Supplies", 
        name: "First Aid Kit", 
        description: "A complete first aid kit with essential supplies like bandages, antiseptics, and pain relievers.",
        instruction: "Should be placed in a community center or given to an individual who needs medical emergency supplies.",
        country: "South Africa",
        state: "Johannesburg",
        request: "",
        donor: "Jim carson",
        images: [
            "https://images.pexels.com/photos/4226931/pexels-photo-4226931.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 18, 
        purpose: "School Support", 
        name: "Stationery Set", 
        description: "A complete set of stationery including pens, pencils, erasers, and notebooks for students.",
        instruction: "Must be given to students who cannot afford school supplies.",
        country: "Kenya",
        state: "Mombasa",
        request: "",
        donor: "Tom Holland",
        images: [
            "https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 19, 
        purpose: "Safe Drinking Water", 
        name: "Water Purifier", 
        description: "A compact water purifier to provide clean drinking water for a household or small community.",
        instruction: "Should be donated to a family or community that lacks access to clean water.",
        country: "Bangladesh",
        state: "Dhaka",
        request: "32",
        donor: "",
        images: [
            "https://images.pexels.com/photos/4031773/pexels-photo-4031773.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    },
    { 
        id: 20, 
        purpose: "Job Search Support", 
        name: "Resume Printing Voucher", 
        description: "A voucher that allows free printing of resumes and job application documents.",
        instruction: "Should be given to job seekers who need printed resumes for job interviews.",
        country: "Nigeria",
        state: "Delta",
        request: "7",
        donor: "",
        images: [
            "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
        ]
    }
];

export default mockItems;
