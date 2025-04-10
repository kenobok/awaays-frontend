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

const galleryImages = [
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

const forumConversations = [
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
];


export {
    heroImages,
    galleryImages,
    events,
    forumConversations
}

