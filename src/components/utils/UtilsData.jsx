import img1 from '../../assets/images/awaays3.png'
import img2 from '../../assets/images/gfin.png'
import img3 from '../../assets/images/awaays2.png'
import img4 from '../../assets/images/community.png'
import img5 from '../../assets/images/hero2.png'
import img6 from '../../assets/images/awaays1.png'
import img7 from '../../assets/images/chat.png'
import img8 from '../../assets/images/awaays4.png'
import img9 from '../../assets/images/hero1.png'
import img10 from '../../assets/images/hero4.png'


const heroImages = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src: img4 },
    { src: img5 },
]

const leaderboardLinks = [
    {
        link: '/community/leaderboard',
        name: 'Top Givers',
        cat: 'topGivers'
    },
    {
        link: '/community/leaderboard/last-week',
        name: 'Last Week',
        cat: 'lastWeek'
    },
    {
        link: '/community/leaderboard/all-time',
        name: 'All Time',
        cat: 'allTime'
    }
]

const leaderboard = [
    {
        donor: "Alexander Jonathan MacArthur",
        item: "Laptop",
        receiver: "Olivia Grace Peterson",
        location: { country: "USA", state: "California" },
        top_giver: false,
        status: "collected",
        date: "2025-04-05",
    },
    {
        donor: "Victoria Eleanor Montgomery",
        item: "Smartphone",
        receiver: "Benjamin David Owens",
        location: { country: "UK", state: "London" },
        top_giver: true,
        status: "pending",
        date: "2025-04-07",
    },
    {
        donor: "Catherine Marie Thompson",
        item: "Bookshelf",
        receiver: "Jackson Michael Williams",
        location: { country: "Canada", state: "Ontario" },
        top_giver: false,
        status: "collected",
        date: "2025-04-09",
    },
    {
        donor: "Nicholas Alexander Hawthorne",
        item: "Bicycle",
        receiver: "Sophia Emily Brown",
        location: { country: "Australia", state: "Victoria" },
        top_giver: true,
        status: "pending",
        date: "2025-04-10",
    },
    {
        donor: "Isabella Charlotte Richards",
        item: "Desk Chair",
        receiver: "Elijah Thomas Garcia",
        location: { country: "Germany", state: "Bavaria" },
        top_giver: true,
        status: "collected",
        date: "2025-04-02",
    },
    {
        donor: "Christopher William Mitchell",
        item: "Washing Machine",
        receiver: "Amelia Rose Davis",
        location: { country: "USA", state: "New York" },
        top_giver: true,
        status: "pending",
        date: "2025-04-06",
    },
    {
        donor: "Charlotte Victoria Harrison",
        item: "TV",
        receiver: "Ethan James Anderson",
        location: { country: "France", state: "Paris" },
        top_giver: true,
        status: "collected",
        date: "2025-04-01",
    },
    {
        donor: "Thomas Henry Taylor",
        item: "Microwave",
        receiver: "Chloe Grace Walker",
        location: { country: "Italy", state: "Rome" },
        top_giver: false,
        status: "pending",
        date: "2025-04-04",
    },
    {
        donor: "Emma Louise Johnson",
        item: "Shoes",
        receiver: "Lucas Daniel Lee",
        location: { country: "Spain", state: "Madrid" },
        top_giver: false,
        status: "collected",
        date: "2025-04-08",
    },
    {
        donor: "James Andrew Robertson",
        item: "Kitchen Set",
        receiver: "Zoe Isabella Martin",
        location: { country: "India", state: "Maharashtra" },
        top_giver: true,
        status: "pending",
        date: "2025-04-09",
    },
    {
        donor: "Jertson Sionis",
        item: "Kitchen Set",
        receiver: "Zoe Isabella Martin",
        location: { country: "India", state: "Maharashtra" },
        top_giver: true,
        status: "pending",
        date: "2025-03-09",
    },
];

const forums = [
    {
        id: 1,
        slug: 'general-description',
        name: 'General Discussion',
        button: 'Start Discussion',
        image: img1,
        description: 'Talk about anything with the community.',
        conversations: [
            {
                id: 1,
                title: "How do I start a giveaway?",
                author: "User123",
                content: "I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item?",
                date: "2025-04-08",
                likes: 4,
                replies: [
                    {
                        id: 1,
                        author: "HelperMike",
                        content: "Click on the 'Give Away' button on the homepage and fill in the item details.",
                        date: "2025-04-08",
                        likes: 2
                    },
                    {
                        id: 2,
                        author: "JaneDoe",
                        content: "Also make sure to add a clear image and a short description!",
                        date: "2025-04-09",
                        likes: 1
                    }
                ]
            },
            {
                id: 2,
                title: "Can I receive items outside my state?",
                author: "Ikechukwu Ogbonnia Chuckwuemeka",
                content: "I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed?",
                date: "2025-04-07",
                likes: 5,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "It depends on the donor. You can message them directly to ask if they're open to shipping.",
                        date: "2025-04-07",
                        likes: 2
                    }
                ]
            },
            {
                id: 3,
                title: "Bug: Image not uploading on mobile",
                author: "TechieGirl",
                content: "When I try to upload an image from my phone, it doesn’t work.",
                date: "2025-04-06",
                likes: 6,
                replies: [
                    {
                        id: 1,
                        author: "SupportTeam",
                        content: "Thanks for reporting! We're looking into this and will update shortly.",
                        date: "2025-04-06",
                        likes: 3
                    },
                    {
                        id: 2,
                        author: "HelperMike",
                        content: "Click on the 'Give Away' button on the homepage and fill in the item details...",
                        date: "2025-04-08",
                        likes: 1
                    },
                    {
                        id: 3,
                        author: "JaneDoe",
                        content: "Also make sure to add a clear image and a short description!",
                        date: "2025-04-09",
                        likes: 2
                    },
                    {
                        id: 4,
                        author: "InspireDaily",
                        content: "Such a beautiful story. Thanks for sharing! ❤️",
                        date: "2025-04-02",
                        likes: 4
                    },
                    {
                        id: 5,
                        author: "SupportTeam",
                        content: "You might have violated a rule. Kindly check your inbox or contact support directly.",
                        date: "2025-04-01",
                        likes: 1
                    },
                    {
                        id: 6,
                        author: "QuickDonor",
                        content: "Yes! Also, quick response to messages increases your reputation.",
                        date: "2025-03-31",
                        likes: 1
                    },
                    {
                        id: 7,
                        author: "Admin",
                        content: "Currently, you can only request deletion through support. Editing will be available soon.",
                        date: "2025-03-30",
                        likes: 3
                    }
                ]
            },
            {
                id: 4,
                title: "Best way to increase my leaderboard score?",
                author: "HustleKing",
                content: "Any tips on how to rank higher on the donor board?",
                date: "2025-04-05",
                likes: 7,
                replies: [
                    {
                        id: 1,
                        author: "GiveawayQueen",
                        content: "Be consistent and share items people really need. Engage with the community too!",
                        date: "2025-04-05",
                        likes: 2
                    }
                ]
            },
            {
                id: 5,
                title: "Received my first giveaway today!",
                author: "SmileyZee",
                content: "Huge thanks to @PeacefulHeart for the school bag. It means a lot.",
                date: "2025-04-04",
                likes: 9,
                replies: [
                    {
                        id: 1,
                        author: "PeacefulHeart",
                        content: "You’re most welcome 😊. So glad it’s useful to you.",
                        date: "2025-04-04",
                        likes: 5
                    },
                    {
                        id: 2,
                        author: "HopefulHelper",
                        content: "Same here! It’s so cool to see people helping each other out with things they no longer need.",
                        date: "2025-04-09T10:15:00Z",
                        likes: 2
                    },
                    {
                        id: 3,
                        author: "NewbieDonor",
                        content: "I joined to declutter my house and it feels great to give items a second life.",
                        date: "2025-04-09T10:30:00Z",
                        likes: 1
                    }
                ]
            },
            {
                id: 6,
                title: "What should I avoid giving away?",
                author: "CuriousCat",
                content: "Are there any banned or discouraged items on this platform?",
                date: "2025-04-03",
                likes: 3,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "Yes! No weapons, expired food, or illegal items. Please check our community guidelines.",
                        date: "2025-04-03",
                        likes: 2
                    }
                ]
            },
            {
                id: 7,
                title: "Testimonial: This platform changed my life!",
                author: "FaithfulSoul",
                content: "After weeks of struggle, I got a laptop that helped me resume remote work. Thank you! After weeks of struggle, I got a laptop that helped me resume remote work. Thank you! After weeks of struggle, I got a laptop that helped me resume remote work. Thank you! After weeks of struggle, I got a laptop that helped me resume remote work. Thank you! After weeks of struggle, I got a laptop that helped me resume remote work. Thank you! After weeks of struggle, I got a laptop that helped me resume remote work. Thank you!",
                date: "2025-04-02",
                likes: 12,
                replies: [
                    {
                        id: 1,
                        author: "InspireDaily",
                        content: "Such a beautiful story. Thanks for sharing! ❤️",
                        date: "2025-04-02",
                        likes: 4
                    }
                ]
            },
            {
                id: 8,
                title: "Why can't I send messages?",
                author: "BlockedUser",
                content: "Every time I click on 'Message Donor', it says I'm restricted.",
                date: "2025-04-01",
                likes: 1,
                replies: [
                    {
                        id: 1,
                        author: "SupportTeam",
                        content: "You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly.",
                        date: "2025-04-01",
                        likes: 2
                    }
                ]
            },
            {
                id: 9,
                title: "Giveaway Tips: What works best?",
                author: "SavvyGiver",
                content: "From experience, labeling items clearly and using daylight photos helps!",
                date: "2025-03-31",
                likes: 6,
                replies: [
                    {
                        id: 1,
                        author: "QuickDonor",
                        content: "Yes! Also, quick response to messages increases your reputation.",
                        date: "2025-03-31",
                        likes: 1
                    }
                ]
            },
            {
                id: 10,
                title: "How do I delete my post?",
                author: "NewbiePoster",
                content: "I mistakenly posted the wrong image. Can I edit or delete it?",
                date: "2025-03-30",
                likes: 2,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "Currently, you can only request deletion through support. Editing will be available soon.",
                        date: "2025-03-30",
                        likes: 2
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        slug: 'giveaway-questions',
        name: 'Giveaway Questions',
        button: 'Ask Question',
        image: img2,
        description: 'Ask or answer questions about giveaways.',
        conversations: [
            {
                id: 1,
                title: "How do I start a giveaway?",
                author: "User123",
                content: "I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item?",
                date: "2025-04-08",
                likes: 4,
                replies: [
                    {
                        id: 1,
                        author: "HelperMike",
                        content: "Click on the 'Give Away' button on the homepage and fill in the item details.",
                        date: "2025-04-08",
                        likes: 2
                    },
                    {
                        id: 2,
                        author: "JaneDoe",
                        content: "Also make sure to add a clear image and a short description!",
                        date: "2025-04-09",
                        likes: 1
                    }
                ]
            },
            {
                id: 2,
                title: "Can I receive items outside my state?",
                author: "Ikechukwu Ogbonnia Chuckwuemeka",
                content: "I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed? I'm in Enugu, but I saw a great item listed in Lagos. Is shipping allowed?",
                date: "2025-04-07",
                likes: 5,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "It depends on the donor. You can message them directly to ask if they're open to shipping.",
                        date: "2025-04-07",
                        likes: 2
                    }
                ]
            },
            {
                id: 3,
                title: "Best way to increase my leaderboard score?",
                author: "HustleKing",
                content: "Any tips on how to rank higher on the donor board?",
                date: "2025-04-05",
                likes: 7,
                replies: [
                    {
                        id: 1,
                        author: "GiveawayQueen",
                        content: "Be consistent and share items people really need. Engage with the community too!",
                        date: "2025-04-05",
                        likes: 2
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        slug: 'testimonials',
        name: 'Testimonials',
        button: 'Share Testimony',
        image: img3,
        description: 'Share your experiences and success stories.',
        conversations: [
            {
                id: 1,
                title: "How do I start a giveaway?",
                author: "User123",
                content: "I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item? I'm new here. Can someone guide me on how to give away an item?",
                date: "2025-04-08",
                likes: 4,
                replies: [
                    {
                        id: 1,
                        author: "HelperMike",
                        content: "Click on the 'Give Away' button on the homepage and fill in the item details.",
                        date: "2025-04-08",
                        likes: 2
                    },
                    {
                        id: 2,
                        author: "JaneDoe",
                        content: "Also make sure to add a clear image and a short description!",
                        date: "2025-04-09",
                        likes: 1
                    }
                ]
            },
        ]
    },
    {
        id: 4,
        slug: 'suggestions-and-feedbacks',
        name: 'Suggestions & Feedbacks',
        button: 'Share Your Thoughts',
        image: img4,
        description: 'Help improve the platform with your ideas.',
        conversations: [
            {
                id: 5,
                title: "Received my first giveaway today!",
                author: "SmileyZee",
                content: "Huge thanks to @PeacefulHeart for the school bag. It means a lot.",
                date: "2025-04-04",
                likes: 9,
                replies: [
                    {
                        id: 1,
                        author: "PeacefulHeart",
                        content: "You’re most welcome 😊. So glad it’s useful to you.",
                        date: "2025-04-04",
                        likes: 5
                    },
                    {
                        id: 2,
                        author: "HopefulHelper",
                        content: "Same here! It’s so cool to see people helping each other out with things they no longer need.",
                        date: "2025-04-09T10:15:00Z",
                        likes: 2
                    },
                    {
                        id: 3,
                        author: "NewbieDonor",
                        content: "I joined to declutter my house and it feels great to give items a second life.",
                        date: "2025-04-09T10:30:00Z",
                        likes: 1
                    }
                ]
            },
            {
                id: 6,
                title: "What should I avoid giving away?",
                author: "CuriousCat",
                content: "Are there any banned or discouraged items on this platform?",
                date: "2025-04-03",
                likes: 3,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "Yes! No weapons, expired food, or illegal items. Please check our community guidelines.",
                        date: "2025-04-03",
                        likes: 2
                    }
                ]
            },
            {
                id: 8,
                title: "Why can't I send messages?",
                author: "BlockedUser",
                content: "Every time I click on 'Message Donor', it says I'm restricted.",
                date: "2025-04-01",
                likes: 1,
                replies: [
                    {
                        id: 1,
                        author: "SupportTeam",
                        content: "You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly. You might have violated a rule. Kindly check your inbox or contact support directly.",
                        date: "2025-04-01",
                        likes: 2
                    }
                ]
            },
            {
                id: 9,
                title: "Giveaway Tips: What works best?",
                author: "SavvyGiver",
                content: "From experience, labeling items clearly and using daylight photos helps!",
                date: "2025-03-31",
                likes: 6,
                replies: [
                    {
                        id: 1,
                        author: "QuickDonor",
                        content: "Yes! Also, quick response to messages increases your reputation.",
                        date: "2025-03-31",
                        likes: 1
                    }
                ]
            },
            {
                id: 10,
                title: "How do I delete my post?",
                author: "NewbiePoster",
                content: "I mistakenly posted the wrong image. Can I edit or delete it?",
                date: "2025-03-30",
                likes: 2,
                replies: [
                    {
                        id: 1,
                        author: "Admin",
                        content: "Currently, you can only request deletion through support. Editing will be available soon.",
                        date: "2025-03-30",
                        likes: 2
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        slug: 'community-hangout',
        name: 'Community Hangout',
        button: 'Join Hangout',
        image: img5,
        description: 'Chill, chat, and connect with others.',
        conversations: [
            {
                id: 1,
                title: "Bug: Image not uploading on mobile",
                author: "TechieGirl",
                content: "When I try to upload an image from my phone, it doesn’t work.",
                date: "2025-04-06",
                likes: 6,
                replies: [
                    {
                        id: 1,
                        author: "SupportTeam",
                        content: "Thanks for reporting! We're looking into this and will update shortly.",
                        date: "2025-04-06",
                        likes: 3
                    },
                    {
                        id: 2,
                        author: "HelperMike",
                        content: "Click on the 'Give Away' button on the homepage and fill in the item details...",
                        date: "2025-04-08",
                        likes: 1
                    },
                    {
                        id: 3,
                        author: "JaneDoe",
                        content: "Also make sure to add a clear image and a short description!",
                        date: "2025-04-09",
                        likes: 2
                    },
                    {
                        id: 4,
                        author: "InspireDaily",
                        content: "Such a beautiful story. Thanks for sharing! ❤️",
                        date: "2025-04-02",
                        likes: 4
                    },
                    {
                        id: 5,
                        author: "SupportTeam",
                        content: "You might have violated a rule. Kindly check your inbox or contact support directly.",
                        date: "2025-04-01",
                        likes: 1
                    },
                    {
                        id: 6,
                        author: "QuickDonor",
                        content: "Yes! Also, quick response to messages increases your reputation.",
                        date: "2025-03-31",
                        likes: 1
                    },
                    {
                        id: 7,
                        author: "Admin",
                        content: "Currently, you can only request deletion through support. Editing will be available soon.",
                        date: "2025-03-30",
                        likes: 3
                    }
                ]
            },
        ]
    },
];

const groups = [
    {
        "id": 1,
        "name": "Moms Giveback Circle",
        "slug": "moms-giveback-circle",
        "description": "Share items with fellow moms",
        "admin": "Elena Torres",
        "members": ["Alice Johnson", "Grace Kim", "Maria Lopez", "Olivia Martins", "Khadija Musa", "Yasmin Ahmed"],
        "dateCreated": "2024-09-01",
        "image": img3,
        "conversations": [
            {
                "user": "Alice Johnson",
                "message": "Thanks so much for the baby clothes! They are just what I needed for my little one. The quality is fantastic, and I really appreciate the help from everyone here.",
                "date": "2024-09-02",
                "time": "14:30"
            },
            {
                "user": "Maria Lopez",
                "message": "Does anyone have a stroller to give away? My old one just broke, and I am in desperate need of a replacement. I’m happy to trade or donate something in return if needed.",
                "date": "2024-09-02",
                "time": "15:00"
            },
            {
                "user": "Olivia Martins",
                "message": "Happy to share formula tins I don't use anymore. I had bought more than needed, and now my baby has switched to solids. Anyone interested? I’d be happy to send them over if you’re local.",
                "date": "2024-09-02",
                "time": "15:30"
            }
        ]
    },
    {
        "id": 2,
        "name": "Techie Givers",
        "slug": "techie-givers",
        "description": "Tech giveaways and gadget swaps",
        "admin": "Hassan Ali",
        "members": ["Benjamin Lee", "Daniel Smith", "Nathan Zhao", "Liam Brown", "Ryan Jones", "Xander Blake"],
        "dateCreated": "2024-07-06",
        "image": img8,
        "conversations": [
            {
                "user": "Benjamin Lee",
                "message": "Giving away an old tablet. It still works well for basic browsing and reading. I upgraded recently, so I no longer need it. Let me know if anyone wants to take it off my hands!",
                "date": "2024-07-07",
                "time": "10:00"
            },
            {
                "user": "Daniel Smith",
                "message": "Does anyone have a spare mouse? Mine broke last week, and I’m trying to avoid buying one for now. I don’t mind a used one as long as it’s still in decent condition. Let me know if you’ve got one you’re not using!",
                "date": "2024-07-07",
                "time": "10:30"
            }
        ]
    },
    {
        "id": 3,
        "name": "Book Swap Squad",
        "slug": "book-swap-squad",
        "description": "Exchange books you’ve read",
        "admin": "Catherine Wu",
        "members": ["Franklin Osei", "Sofia Petrova", "Paul Dupont", "Uma Raj"],
        "dateCreated": "2024-05-16",
        "image": img6,
        "conversations": [
            {
                "user": "Franklin Osei",
                "message": "Just dropped off 3 novels. I hope someone enjoys them! They’re in excellent condition. Feel free to let me know if you need recommendations for more books in my collection.",
                "date": "2024-05-17",
                "time": "09:00"
            },
            {
                "user": "Sofia Petrova",
                "message": "Looking for mystery recommendations.",
                "date": "2024-05-17",
                "time": "09:30"
            }
        ]
    },
    {
        "id": 4,
        "name": "Student Essentials Hub",
        "slug": "student-essentials-hub",
        "description": "For students giving and receiving supplies",
        "admin": "Liam Harris",
        "members": ["Liam Harris"],
        "dateCreated": "2024-08-02",
        "image": img2,
        "conversations": [

        ]
    },
    {
        "id": 5,
        "name": "Baby & Kids Corner",
        "slug": "baby-kids-corner",
        "description": "Toys, clothes, and baby gear exchange",
        "admin": "Sophie Turner",
        "members": ["Mia Davis", "Sophia Johnson"],
        "dateCreated": "2024-07-19",
        "image": img4,
        "conversations": [
            {
                "user": "Hannah Walker",
                "message": "Just donated some baby toys and clothes. They are gently used and still in great condition. Let me know if anyone is interested or needs them!",
                "date": "2024-07-20",
                "time": "10:30"
            }
        ]
    },
    {
        "id": 6,
        "name": "Furniture Finders",
        "slug": "furniture-finders",
        "description": "Share used furniture around town",
        "admin": "Daniel Gomez",
        "members": ["Laura Smith", "Tina Baker", "Clara Brown", "Ben Davis", "Mark Lee", "Laura Smith", "Tina Baker", "Clara Brown", "Ogbonaiya Batholomew", "Mark Lee", "Ifesinachi Sopuruchi Smith", "Tina Baker", "Clara Brown", "Ben Davis", "Mark Lee", "Laura Smith", "Tina Baker Ayomide Ikechukwu", "Clara Brown", "Ben Davis", "Mark Lee",],
        "dateCreated": "2024-06-11",
        "image": img1,
        "conversations": [
            {
                "user": "Laura Smith",
                "message": "Looking to donate a gently used sofa. It’s in great condition and has no tears. Let me know if anyone needs one or knows someone who could use it!",
                "date": "2024-06-12",
                "time": "15:00"
            }
        ]
    },
    {
        "id": 7,
        "name": "Kitchen Swap Group",
        "slug": "kitchen-swap-group",
        "description": "Pots, dishes, appliances and more",
        "admin": "Anna Martinez",
        "members": ["Michael Davis", "Nina Singh", "Carlos Jones", "Emily Wright", "Zoe Green"],
        "dateCreated": "2024-06-26",
        "image": img7,
        "conversations": [

        ]
    },
    {
        "id": 8,
        "name": "Fashion Forward",
        "slug": "fashion-forward",
        "description": "Give away or swap stylish clothing",
        "admin": "Rachel Hughes",
        "members": ["Chloe Harris", "Bella Moore", "Ivy Stone", "Emma Clark", "Lily Evans"],
        "dateCreated": "2024-05-30",
        "image": img5,
        "conversations": [
            {
                "user": "Chloe Harris",
                "message": "Looking to swap a few dresses. I have some new summer dresses that I bought but never wore. If anyone’s interested, I’d be happy to exchange them for something!",
                "date": "2024-05-31",
                "time": "14:30"
            }
        ]
    },
    {
        "id": 9,
        "name": "Pet Supply Exchange",
        "slug": "pet-supply-exchange",
        "description": "Items for dogs, cats and other pets",
        "admin": "Jake Johnson",
        "members": ["Sarah Brown", "Kevin Liu", "Nancy Patel", "Tom White", "Olivia King"],
        "dateCreated": "2024-04-25",
        "image": img6,
        "conversations": [
            {
                "user": "Sarah Brown",
                "message": "I have some pet food bags that my dog no longer likes.",
                "date": "2024-04-26",
                "time": "16:30"
            },
            {
                "user": "Daniel Smith",
                "message": "Donated my college textbooks today! If anyone is in need of textbooks for any subjects, feel free to come by. They’ve been gathering dust for a while now, and I’d love for them to go to good use.",
                "date": "2024-05-17",
                "time": "10:00"
            },
            {
                "user": "Uma Raj",
                "message": "I have children’s storybooks to give.",
                "date": "2024-05-17",
                "time": "10:30"
            },
            {
                "user": "Franklin Osei",
                "message": "Anyone want a poetry collection? It’s a small but beautiful set of works by various poets. I’m looking to pass it on to someone who’ll appreciate it more than I do.",
                "date": "2024-05-17",
                "time": "11:00"
            },
            {
                "user": "Sofia Petrova",
                "message": "Thanks for the romance novel! It was such an enjoyable read. I finished it in two days, and I can’t wait to return the favor with something new for the group!",
                "date": "2024-05-17",
                "time": "11:30"
            },
            {
                "user": "Daniel Smith",
                "message": "Does anyone have a spare mouse? Mine broke last week, and I’m trying to avoid buying one for now. I don’t mind a used one as long as it’s still in decent condition. Let me know if you’ve got one you’re not using!",
                "date": "2024-07-07",
                "time": "10:30"
            },
            {
                "user": "Daniel Smith",
                "message": "I’m donating my used monitor.",
                "date": "2024-07-07",
                "time": "11:00"
            },
            {
                "user": "Ryan Jones",
                "message": "I can share an HDMI cable. It’s 6 feet long and works perfectly fine, just didn’t need it after upgrading my setup. Anyone need one for connecting devices?",
                "date": "2024-07-07",
                "time": "11:30"
            },
            {
                "user": "Xander Blake",
                "message": "Thanks for the power bank! It came just in time for my trip. I really appreciate the generosity—this community is amazing! Looking forward to offering something in return soon.",
                "date": "2024-07-07",
                "time": "12:00"
            },
            {
                "user": "Benjamin Lee",
                "message": "Would love a used printer if anyone has one. My old printer finally gave out, and I haven’t gotten around to buying a new one. I’m mainly looking for one that works well with wireless connections.",
                "date": "2024-07-07",
                "time": "12:30"
            }
        ]
    }
];

const galleries = [
    {
        slug: 'general-giveaway',
        name: 'General Giveaway',
        image: img1,
        galleryImages: [
            { src: img1, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img9, caption: 'Ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img10, caption: 'Eract, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'healthcare-support',
        name: 'Healthcare Support',
        image: img2,
        galleryImages: [
            { src: img1, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img2, caption: 'Like-minded people who believe in giving' },
            { src: img3, caption: 'Interact, and share ideas with like-minded people who believe in giving, and sustainability' },
            { src: img4, caption: 'And share ideas with like-minded people who and sustainability' },
            { src: img5, caption: 'Share ideas with like-minded people' },
            { src: img6, caption: 'Nect, interact, believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'prison-outreach',
        name: 'Prison Outreach',
        image: img3,
        galleryImages: [
            { src: img9, caption: 'Ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img10, caption: 'Eract, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'homeless-shelter',
        name: 'Homeless Shelter',
        image: img4,
        galleryImages: [

        ]
    },
    {
        slug: 'education-support',
        name: 'Education Support',
        image: img5,
        galleryImages: [
            { src: img1, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img2, caption: 'Like-minded people who believe in giving' },
            { src: img9, caption: 'Ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img10, caption: 'Eract, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'orphanage-support',
        name: 'Orphanage Support',
        image: img6,
        galleryImages: [
            { src: img1, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img2, caption: 'Like-minded people who believe in giving' },
            { src: img3, caption: 'Interact, and share ideas with like-minded people who believe in giving, and sustainability' },
            { src: img4, caption: 'And share ideas with like-minded people who and sustainability' },
            { src: img5, caption: 'Share ideas with like-minded people' },
            { src: img6, caption: 'Nect, interact, believe in giving, helping, and sustainability' },
            { src: img7, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img8, caption: 'giving, helping, and sustainability' },
            { src: img9, caption: 'Ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img10, caption: 'Eract, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'disaster-relief',
        name: 'Disaster Relief',
        image: img7,
        galleryImages: [
            { src: img9, caption: 'Ideas with like-minded people who believe in giving, helping, and sustainability' },
            { src: img10, caption: 'Eract, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'disability-support',
        name: 'Disability Support',
        image: img8,
        galleryImages: [

        ]
    }
]

const events = [
    {
        title: "Community Clean-Up Drive",
        description: "Join us in making our neighborhood cleaner and greener with a group clean-up and tree-planting effort.",
        location: "",
        date: "",
        time: "",
        image: img1
    },
    {
        title: "Tech Innovators Conference 2025",
        description: "A gathering of the brightest minds in tech to explore emerging trends and innovations.",
        location: "Silicon Valley Convention Center, San Jose, CA",
        date: "2025-07-22",
        time: "02:00 PM",
        image: img2
    },
    {
        title: "Local Farmers' Market Festival",
        description: "Celebrate local produce, handmade goods, and live performances in a vibrant community atmosphere.",
        location: "",
        date: "2025-08-10",
        time: "8:00 AM",
        image: img3
    },
    {
        title: "Annual Charity Marathon",
        description: "Lace up for a run that supports local nonprofits and promotes a healthy lifestyle.",
        location: "Lakefront Trail, Chicago, IL",
        date: "2025-09-05",
        time: "12:00 AM",
        image: img4
    },
    {
        title: "Art in the Park Exhibition",
        description: "Explore stunning artworks by local creatives in an open-air art gallery setting.",
        location: "Griffith Park, Los Angeles, CA",
        date: "",
        time: "",
        image: img5
    },
    {
        title: "Music & Food Truck Festival",
        description: "A celebration of great tunes and tasty street food with performances and gourmet bites.",
        location: "Waterfront Park, Seattle, WA",
        date: "2025-08-30",
        time: "10:50 AM",
        image: img6
    },
    {
        title: "Startup Pitch Night",
        description: "Entrepreneurs pitch their big ideas to a panel of investors and mentors.",
        location: "Innovation Hub, Boston, MA",
        date: "2025-11-18",
        time: "10:00 AM",
        image: img7
    },
    {
        title: "Outdoor Yoga Retreat",
        description: "Recharge your body and mind with a peaceful yoga experience surrounded by nature.",
        location: "Golden Gate Park, San Francisco, CA",
        date: "",
        time: "07:30 AM",
        image: img8
    },
    {
        title: "Film Under the Stars",
        description: "Watch classic films on the big screen under the night sky with friends and family.",
        location: "Millennium Park, Chicago, IL",
        date: "2025-07-19",
        time: "10:50 AM",
        image: img9
    },
    {
        title: "Winter Wonderland Carnival",
        description: "Experience the magic of the holidays with rides, games, and festive cheer.",
        location: "Bryant Park, New York City, NY",
        date: "2025-12-10",
        time: "",
        image: img10
    }
];

const messages = [
    {
        "id": 1,
        "slug": "mary-dan-chat",
        "participants": ["Mary", "Dan"],
        "opened": false,
        "conversation": [
            {
                "id": 1,
                "sender": "Mary",
                "receiver": "Dan",
                "message": "Hi Dan! Is that wooden shelf still up for grabs?",
                "time": "09:05 AM",
                "date": "2025-04-19",
                "read": false,
                "senderImage": img1,
            },
            {
                "id": 2,
                "sender": "Dan",
                "receiver": "Mary",
                "message": "Hey Mary, yes it is. Do you want to come pick it up today?",
                "time": "09:08 AM",
                "date": "2025-04-19",
                "read": false,
                "senderImage": img1,
            }
        ]
    },
    {
        "id": 2,
        "slug": "emeka-ruth-chat",
        "participants": ["Emeka", "Ruth"],
        "opened": true,
        "conversation": [
            {
                "id": 3,
                "sender": "Ruth",
                "receiver": "Emeka",
                "message": "Hello! I saw your bicycle post. Is it still working fine?",
                "time": "07:14 PM",
                "date": "2025-04-18",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/18.jpg",
            },
            {
                "id": 4,
                "sender": "Emeka",
                "receiver": "Ruth",
                "message": "Yes, it’s in great condition. Just needs a little cleaning.",
                "time": "07:16 PM",
                "date": "2025-04-18",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/18.jpg",
            }
        ]
    },
    {
        "id": 3,
        "slug": "sade-ken-chat",
        "participants": ["Sade", "Ken"],
        "opened": false,
        "conversation": [
            {
                "id": 5,
                "sender": "Sade",
                "receiver": "Ken",
                "message": "Thanks again for the shoes. They fit perfectly!",
                "time": "11:32 AM",
                "date": "2025-04-17",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/25.jpg",
            },
            {
                "id": 6,
                "sender": "Ken",
                "receiver": "Sade",
                "message": "Glad to hear that! Happy to give them away.",
                "time": "11:34 AM",
                "date": "2025-04-17",
                "read": false,
                "senderImage": img4,
            },
            {
                "id": 5,
                "sender": "Sade",
                "receiver": "Ken",
                "message": "You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "11:32 AM",
                "date": "2025-04-17",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/25.jpg",
            },
            {
                "id": 6,
                "sender": "Ken",
                "receiver": "Sade",
                "message": "Glad to hear that! Happy to give them away.",
                "time": "11:34 AM",
                "date": "2025-04-17",
                "read": false,
                "senderImage": img4,
            }
        ]
    },
    {
        "id": 4,
        "slug": "blessing-ray-chat",
        "participants": ["Blessing", "Ray"],
        "opened": true,
        "conversation": [
            {
                "id": 7,
                "sender": "Ray",
                "receiver": "Blessing",
                "message": "Hey, the books are ready for pickup anytime today.",
                "time": "08:45 AM",
                "date": "2025-04-17",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/21.jpg",
            },
            {
                "id": 8,
                "sender": "Blessing",
                "receiver": "Ray",
                "message": "Awesome! I’ll swing by around noon. Thanks!",
                "time": "08:47 AM",
                "date": "2025-04-17",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/21.jpg",
            }
        ]
    },
    {
        "id": 5,
        "slug": "ibrahim-linda-chat",
        "participants": ["Ibrahim", "Linda"],
        "opened": true,
        "conversation": [
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker?",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker? You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "Okay",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker?",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker? You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "Okay",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker?",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or . on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
            {
                "id": 9,
                "sender": "Linda",
                "receiver": "Ibrahim",
                "message": "Are you still giving out the rice cooker? You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details. You're very close! The issue is that message.conversation is an array, so you can't directly access .sender or on it. You need to grab the last message in the conversation array to display the most recent message's details.",
                "time": "06:20 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/34.jpg",
            },
            {
                "id": 10,
                "sender": "Ibrahim",
                "receiver": "Linda",
                "message": "Okay",
                "time": "06:23 PM",
                "date": "2025-04-16",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/34.jpg",
            },
        ]
    },
    {
        "id": 6,
        "slug": "tunde-jane-chat",
        "participants": ["Tunde", "Jane"],
        "opened": false,
        "conversation": [
            {
                "id": 11,
                "sender": "Jane",
                "receiver": "Tunde",
                "message": "Thank you for the baby clothes. They’re lovely.",
                "time": "04:10 PM",
                "date": "2025-04-15",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/12.jpg",
            },
            {
                "id": 12,
                "sender": "Tunde",
                "receiver": "Jane",
                "message": "You're welcome! I'm glad they’ll be useful.",
                "time": "04:13 PM",
                "date": "2025-04-15",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/men/12.jpg",
            }
        ]
    },
    {
        "id": 7,
        "slug": "grace-paul-chat",
        "participants": ["Grace", "Paul"],
        "opened": true,
        "conversation": [
            {
                "id": 13,
                "sender": "Grace",
                "receiver": "Paul",
                "message": "Hi Paul, is the matress still up for donation?",
                "time": "01:22 PM",
                "date": "2025-04-15",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/women/41.jpg",
            },
            {
                "id": 14,
                "sender": "Paul",
                "receiver": "Grace",
                "message": "Yes, and it’s clean. Can you come today?",
                "time": "01:25 PM",
                "date": "2025-04-15",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/41.jpg",
            }
        ]
    },
    {
        "id": 8,
        "slug": "juliet-mike-chat",
        "participants": ["Juliet", "Mike"],
        "opened": true,
        "conversation": [
            {
                "id": 15,
                "sender": "Mike",
                "receiver": "Juliet",
                "message": "The curtains are yours if you still want them.",
                "time": "05:17 PM",
                "date": "2025-04-14",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/28.jpg",
            },
            {
                "id": 16,
                "sender": "Juliet",
                "receiver": "Mike",
                "message": "Perfect! I’ll come pick them up tomorrow morning.",
                "time": "05:20 PM",
                "date": "2025-04-14",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/28.jpg",
            }
        ]
    },
    {
        "id": 9,
        "slug": "amaka-frank-chat",
        "participants": ["Amaka", "Frank"],
        "opened": true,
        "conversation": [
            {
                "id": 17,
                "sender": "Frank",
                "receiver": "Amaka",
                "message": "I dropped off the office chair at the front desk.",
                "time": "12:03 PM",
                "date": "2025-04-13",
                "read": true,
                "senderImage": "https://randomuser.me/api/portraits/men/37.jpg",
            },
            {
                "id": 18,
                "sender": "Amaka",
                "receiver": "Frank",
                "message": "Thanks so much. I’ll get it this afternoon.",
                "time": "12:05 PM",
                "date": "2025-04-13",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/37.jpg",
            }
        ]
    },
    {
        "id": 10,
        "slug": "kelvin-tola-chat",
        "participants": ["Kelvin", "Tola"],
        "opened": false,
        "conversation": [
            {
                "id": 19,
                "sender": "Tola",
                "receiver": "Kelvin",
                "message": "Hey, I picked up the blender. Thank you again!",
                "time": "09:48 AM",
                "date": "2025-04-12",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/women/17.jpg",
            },
            {
                "id": 20,
                "sender": "Kelvin",
                "receiver": "Tola",
                "message": "You’re welcome. Enjoy!",
                "time": "09:50 AM",
                "date": "2025-04-12",
                "read": false,
                "senderImage": "https://randomuser.me/api/portraits/men/17.jpg",
            }
        ]
    }
]


export {
    heroImages,
    leaderboardLinks,
    leaderboard,
    forums,
    groups,
    galleries,
    events,
    messages,
}

