import { useState } from "react";

const faqsData = [
    {
        question: "What is this giveaway platform?",
        answer:
            "Our platform allows users to give away and receive free items, including cash, automobiles, electronics, and more.",
    },
    {
        question: "How do I participate in a giveaway?",
        answer:
            "Simply browse available giveaways, click on the one you're interested in, and follow the instructions to enter.",
    },
    {
        question: "Is this platform completely free?",
        answer:
            "Yes! Users can give away items for free, and recipients can claim them without any charges.",
    },
    {
        question: "Can I give away cash instead of items?",
        answer:
            "Yes! You can list cash giveaways and set entry requirements if needed.",
    },
    {
        question: "How do I post a giveaway?",
        answer:
            "Click on 'Give Item', fill in the required details, and submit your listing. It will be reviewed before approval.",
    },
    {
        question: "How do I ensure fair participation?",
        answer:
            "We use a random selection process for most giveaways, ensuring fair chances for all participants.",
    },
    {
        question: "Are there any restrictions on what I can give away?",
        answer:
            "Yes. You cannot give away illegal items, hazardous materials, or anything that violates our Terms & Conditions.",
    },
    {
        question: "How do I report a fraudulent giveaway?",
        answer:
            "If you suspect a giveaway is a scam, click the 'Report' button on the listing or contact our support team.",
    },
    {
        question: "Can I delete my giveaway after posting?",
        answer:
            "Yes, you can manage and delete your listings from your profile dashboard.",
    },
    {
        question: "How do I contact support?",
        answer:
            "You can reach out to our support team via the 'Contact Us' page or email us at awaays.info@gmail.com.",
    },
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="max-w-4xl mx-auto p-15 pb-20 rounded-lg translate-y-[5rem] max-[941px]:p-5">
            <h1 className="text-3xl font-bold mb-10 text-center max-[941px]:mb-7">FAQs</h1>
            <section className="space-y-4">
                {faqsData.map((faq, index) => (
                    <section key={index} className="border rounded-lg p-4">
                        <button className="flex justify-between items-center w-full text-lg font-semibold text-indigo-900 cursor-pointer leading-[1.3rem]" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                            <span>{openIndex === index ? "▲" : "▼"}</span>
                        </button>
                        {openIndex === index && <p className="mt-2 text-gray-700 leading-[1.2rem]">{faq.answer}</p>}
                    </section>
                ))}
            </section>
        </main>
    );
};

export default FAQs;
