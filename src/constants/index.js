import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";
import shoe4 from "../assets/images/nikePop1.jpg";
import shoe5 from "../assets/images/nikePop2.jpg";
import shoe6 from "../assets/images/nikePop3.jpg";
import shoe7 from "../assets/images/nikePop4.jpg";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact-us", label: "Contact Us" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
    },
    {
        imgURL: shoe5,
        name: "Nike Air max-1",
        price: "$210.20",
    },
    {
        imgURL: shoe6,
        name: "Nike Air force-1",
        price: "$220.20",
    },
    {
        imgURL: shoe7,
        name: "Nike Air max-02",
        price: "$230.20",
    },
];

export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "https://www.nike.com/ie/w/air-force-1-shoes-5sj3yzy7ok" },
            { name: "Air Max 1", link: "https://www.nike.com/in/w/air-max-1-shoes-8p4egzy7ok" },
            { name: "Air Jordan 1", link: "https://www.nike.com/in/w/jordan-1-shoes-4fokyzy7ok" },
            { name: "Air Force 2", link: "https://www.nike.com/in/w?q=air%20force%202&vst=air%20force%202" },
            { name: "Nike Waffle Racer", link: "https://www.nike.com/in/w/nike-waffle-shoes-2wk64zy7ok" },
            { name: "Nike Cortez", link: "https://www.nike.com/in/w/cortez-shoes-byfxzy7ok" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "https://about.nike.com/en/" },
            { name: "FAQs", link: "https://www.nike.com/in/help" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "https://agreementservice.svs.nike.com/sg/en_gb/rest/agreement?agreementType=privacyPolicy&uxId=com.nike.unite&country=SG&language=en&requestType=redirect" },
            { name: "Payment policy", link: "https://agreementservice.svs.nike.com/sg/en_gb/rest/agreement?agreementType=privacyPolicy&uxId=com.nike.unite&country=SG&language=en&requestType=redirect" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook ,link :"https://www.facebook.com/nike/", alt: "facebook logo" },
    { src: twitter , link:"https://x.com/Nike", alt: "twitter logo" },
    { src: instagram ,link: "https://www.instagram.com/nike/", alt: "instagram logo" },
];