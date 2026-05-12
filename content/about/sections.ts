export type AboutSection = {
  heading: string;
  body: string;
  photo: string;
  location: string;
};

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: "Hi, I'm Max",
    body: "You might know me by my online handles **pingu** or **square**. \n\n Here's a little bit about me, alongside some handpicked recents :) \n\n **Say hello!** \n\n max.sun@uwaterloo.ca",
    photo: "/photos/chishang.jpeg",
    location: "Chishang, Taiwan",
  },
  {
    heading: "Born and raised in Toronto,",
    body: "I'm a huge Leafs fan—even though they haven't won a Stanley Cup since 1967. Here's to hoping they win one before I graduate...",
    photo: "/photos/toronto.jpeg",
    location: "Niagara Falls, Canada",
  },
  {
    heading: "My Education.",
    body: "I'm currently studying Computing and Financial Management at the University of Waterloo. \n\n In high school I was part of the MaCS program at William Lyon Mackenzie CI.",
    photo: "/photos/night.jpeg",
    location: "Toronto, Canada",
  },
  {
    heading: "It started with competition...",
    body: "I got into computer science from writing competitive programming contests with my high school friends. \n\n Nowadays, I'm more interested in [building](https://wakatime.com/@pingu15) projects and learning about the techniques behind creating software and systems.",
    photo: "/photos/nature.jpg",
    location: "Bruce Trail, Canada",
  },
  {
    heading: "“Design is not just what it looks like and feels like. Design is how it works.”",
    body: "A quote from Steve Jobs. \n\n To me, good design is about simplicity, clarity, and elegance. I think all three of those qualities are important to good software.",
    photo: "/photos/mexico.jpg",
    location: "Cancun, Mexico",
  },
  {
    heading: "In my spare time,",
    body: "I'm working on personal projects, watching sports, cooking, or playing [chess](https://www.chess.com/member/square715). \n\n You can also catch me [listening](https://open.spotify.com/user/ffeetz9q79hzyqsllcqjjn7s2?si=171e1027fc614548) to Cigarettes After Sex, Mac DeMarco, Passenger, or Zach Bryan.",
    photo: "/photos/camera.jpeg",
    location: "Toronto, Canada",
  },
];
