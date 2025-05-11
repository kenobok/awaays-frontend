import img1 from '../../assets/images/awaays3.png'
import img2 from '../../assets/images/gfin.png'
import img3 from '../../assets/images/awaays2.png'
import img4 from '../../assets/images/community.png'
import img6 from '../../assets/images/awaays1.png'
import img7 from '../../assets/images/chat.png'
import img8 from '../../assets/images/awaays4.png'
import healthcare from '../../assets/images/healthcare.png'
import disaster from '../../assets/images/disaster.png'
import disability from '../../assets/images/disability.png'
import prison from '../../assets/images/prison.png'
import education from '../../assets/images/education.png'
import homeless from '../../assets/images/homeless.png'
import orphans from '../../assets/images/orphans.png'

const HeaderLinks = [
    { name: 'Give Item', goto: '/give-item'},
    { name: 'Giveaways', goto: '/giveaway-items'},
    { name: 'Community', dropdown:[
        { name: 'Leaderboard', goto: '/community/leaderboard' },
        { name: 'Forums', goto: '/community/forums' },
        { name: 'Groups', goto: '/community/groups' },
        { name: 'Events', goto: '/community/events' },
        { name: 'Gallery', goto: '/community/gallery' },
    ]},
    { name: 'How It Works', goto: '/how-it-works'},
    { name: 'FAQs', goto: '/faqs'},
    { name: 'Join', goto: '/auth'}
]

const heroImages = [
    { src: img6 },
    { src: img1 },
    { src: img2 },
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
        "image": img7,
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
        image: img4,
        galleryImages: [
            // { src: img1, caption: 'Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability' },
        ]
    },
    {
        slug: 'healthcare-support',
        name: 'Healthcare Support',
        image: healthcare,
        galleryImages: []
    },
    {
        slug: 'prison-outreach',
        name: 'Prison Outreach',
        image: prison,
        galleryImages: []
    },
    {
        slug: 'homeless-shelter',
        name: 'Homeless Shelter',
        image: homeless,
        galleryImages: []
    },
    {
        slug: 'education-support',
        name: 'Education Support',
        image: education,
        galleryImages: []
    },
    {
        slug: 'orphanage-support',
        name: 'Orphanage Support',
        image: orphans,
        galleryImages: []
    },
    {
        slug: 'disaster-relief',
        name: 'Disaster Relief',
        image: disaster,
        galleryImages: []
    },
    {
        slug: 'disability-support',
        name: 'Disability Support',
        image: disability,
        galleryImages: []
    }
]

const events = [
    // {
    //     title: "",
    //     description: "",
    //     location: "",
    //     date: "",
    //     time: "",
    //     image: ''
    // },
];


export {
    HeaderLinks,
    heroImages,
    leaderboardLinks,
    groups,
    galleries,
    events,
}

