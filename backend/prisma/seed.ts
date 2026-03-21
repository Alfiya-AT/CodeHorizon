import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courses = [
    {
        "title": "100 Days of Code™: The Complete Python Pro Bootcamp",
        "slug": "100-days-of-code-python-pro",
        "description": "Master Python by building projects.",
        "thumbnailUrl": "https://i.ytimg.com/vi/UrsmFxEIp5k/hq720.jpg",
        "price": 459,
        "level": "BEGINNER",
        "tags": "python,programming,bootcamp",
        "isFeatured": true,
        "trailerUrl": "UrsmFxEIp5k",
        "sections": [
            {
                "title": "Section 1 - 100 Part 1",
                "videos": [
                    {
                        "title": "Python Tutorial For Beginners in Hindi | Complete Python Course 🔥",
                        "youtubeVideoId": "UrsmFxEIp5k",
                        "durationSeconds": 39235
                    },
                    {
                        "title": "#100DaysOfCode with Python",
                        "youtubeVideoId": "xpIItCSo5aA",
                        "durationSeconds": 44
                    },
                    {
                        "title": "Introduction to Programming & Python | Python Tutorial - Day #1",
                        "youtubeVideoId": "7wnove7K-ZQ",
                        "durationSeconds": 710
                    },
                    {
                        "title": "Prank using Python!",
                        "youtubeVideoId": "X89cFg7Zd_o",
                        "durationSeconds": 23
                    },
                    {
                        "title": "Python code with harry|apna college|python in hindi for beginners.",
                        "youtubeVideoId": "ieAFNUqBD_c",
                        "durationSeconds": 15
                    }
                ]
            },
            {
                "title": "Section 2 - 100 Part 2",
                "videos": [
                    {
                        "title": "Kaha milega @CodeWithHarry ?",
                        "youtubeVideoId": "66sW7Vj_FP0",
                        "durationSeconds": 38
                    },
                    {
                        "title": "52 Years Old Code!",
                        "youtubeVideoId": "9oXaTbVeznY",
                        "durationSeconds": 42
                    },
                    {
                        "title": "Python Graphics: A Visual Guide with Harry! python code with harry",
                        "youtubeVideoId": "uSq5jZUowFg",
                        "durationSeconds": 12
                    },
                    {
                        "title": "Complete Python Programming Roadmap (Zero to Expert) 🐍",
                        "youtubeVideoId": "g4Ffdh41vRQ",
                        "durationSeconds": 772
                    },
                    {
                        "title": "How to confuse a Python Developer?",
                        "youtubeVideoId": "J8CwlpEwHoA",
                        "durationSeconds": 15
                    }
                ]
            },
            {
                "title": "Section 3 - 100 Part 3",
                "videos": [
                    {
                        "title": "Python in 2024 ❌or ✔️",
                        "youtubeVideoId": "mLnXcYRcbBU",
                        "durationSeconds": 47
                    },
                    {
                        "title": "5 Effective Tips to Learn Python Fast (Pro Hacks)🔥",
                        "youtubeVideoId": "xTSjk6Q6vrc",
                        "durationSeconds": 531
                    },
                    {
                        "title": "Want to learn \"Python\" Before 2025💀 🎯Roadmap",
                        "youtubeVideoId": "AFtHfBs5tco",
                        "durationSeconds": 17
                    }
                ]
            }
        ]
    },
    {
        "title": "C Programming – Complete Course",
        "slug": "c-programming-complete",
        "description": "Learn C from scratch — variables, loops, pointers.",
        "thumbnailUrl": "https://i.ytimg.com/vi/xND0t1pr3KY/hq720.jpg",
        "price": 999,
        "level": "BEGINNER",
        "tags": "c,programming,systems,beginner",
        "isFeatured": true,
        "trailerUrl": "xND0t1pr3KY",
        "sections": [
            {
                "title": "Section 1 - C Part 1",
                "videos": [
                    {
                        "title": "C Programming Full Course for free ⚙️",
                        "youtubeVideoId": "xND0t1pr3KY",
                        "durationSeconds": 24815
                    },
                    {
                        "title": "C Programming Full Course for free ⚙️",
                        "youtubeVideoId": "87SH2Cn0s9A",
                        "durationSeconds": 14700
                    },
                    {
                        "title": "Python Full Course for free 🐍",
                        "youtubeVideoId": "XKHEtdqhLK8",
                        "durationSeconds": 43200
                    },
                    {
                        "title": "which one you write first? ||c/c++/java...",
                        "youtubeVideoId": "lYgUVs0Ipjs",
                        "durationSeconds": 5
                    },
                    {
                        "title": "Start C programming in 15 minutes! ⚙️",
                        "youtubeVideoId": "2ciUcosJFBc",
                        "durationSeconds": 905
                    }
                ]
            },
            {
                "title": "Section 2 - C Part 2",
                "videos": [
                    {
                        "title": "C tutorial for beginners ⚙️",
                        "youtubeVideoId": "nrbBmoINqtk",
                        "durationSeconds": 757
                    },
                    {
                        "title": "C Language Tutorial for Beginners (with Notes & Practice Questions)",
                        "youtubeVideoId": "irqbmMNs2Bo",
                        "durationSeconds": 37927
                    },
                    {
                        "title": "C Programming Tutorial for Beginners",
                        "youtubeVideoId": "KJgsSFOSQv0",
                        "durationSeconds": 13573
                    },
                    {
                        "title": "C++ Full Course for free ⚡️",
                        "youtubeVideoId": "-TkoO8Z07hI",
                        "durationSeconds": 21600
                    },
                    {
                        "title": "Easiest Programming language to start with to earn money",
                        "youtubeVideoId": "av83kx_YGa0",
                        "durationSeconds": 30
                    }
                ]
            },
            {
                "title": "Section 3 - C Part 3",
                "videos": [
                    {
                        "title": "C structs 🏠",
                        "youtubeVideoId": "oKXP1HZ8xIs",
                        "durationSeconds": 252
                    },
                    {
                        "title": "C for loops in 3 minutes! 🔁",
                        "youtubeVideoId": "b4DPj0XAfSg",
                        "durationSeconds": 203
                    },
                    {
                        "title": "C# Full Course for free 🎵",
                        "youtubeVideoId": "wxznTygnRfQ",
                        "durationSeconds": 14401
                    },
                    {
                        "title": "C functions 📞",
                        "youtubeVideoId": "ou_G7_zodR4",
                        "durationSeconds": 157
                    },
                    {
                        "title": "C pointers explained👉",
                        "youtubeVideoId": "DplxIq0mc_Y",
                        "durationSeconds": 484
                    }
                ]
            }
        ]
    },
    {
        "title": "Data Structures & Algorithms",
        "slug": "data-structures-algorithms",
        "description": "Master arrays, linked lists, trees, graphs, sorting, searching.",
        "thumbnailUrl": "https://i.ytimg.com/vi/xwI5OBEnsZU/hq720.jpg",
        "price": 1499,
        "level": "INTERMEDIATE",
        "tags": "dsa,algorithms,data-structures",
        "isFeatured": true,
        "trailerUrl": "xwI5OBEnsZU",
        "sections": [
            {
                "title": "Section 1 - Data Part 1",
                "videos": [
                    {
                        "title": "Data Structures and Algorithms Mega Course – Master Technical Interviews in 49 Hours",
                        "youtubeVideoId": "xwI5OBEnsZU",
                        "durationSeconds": 175820
                    },
                    {
                        "title": "Data Structure and Algorithm Patterns for LeetCode Interviews – Tutorial",
                        "youtubeVideoId": "Z_c4byLrNBU",
                        "durationSeconds": 4503
                    },
                    {
                        "title": "Algorithms and Data Structures Tutorial - Full Course for Beginners",
                        "youtubeVideoId": "8hly31xKli0",
                        "durationSeconds": 19329
                    },
                    {
                        "title": "Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer",
                        "youtubeVideoId": "RBSGKlAvoiM",
                        "durationSeconds": 28997
                    },
                    {
                        "title": "Data Structures - Full Course Using C and C++",
                        "youtubeVideoId": "B31LgI4Y4DQ",
                        "durationSeconds": 35171
                    }
                ]
            },
            {
                "title": "Section 2 - Data Part 2",
                "videos": [
                    {
                        "title": "Data Structures and Algorithms in Python - Full Course for Beginners",
                        "youtubeVideoId": "pkYVOmU3MgA",
                        "durationSeconds": 45050
                    },
                    {
                        "title": "Data Structures and Algorithms in JavaScript - Full Course for Beginners",
                        "youtubeVideoId": "t2CEgPsws3U",
                        "durationSeconds": 6775
                    },
                    {
                        "title": "Fastest way to learn Data Structures and Algorithms",
                        "youtubeVideoId": "tNrNLoCqzco",
                        "durationSeconds": 522
                    },
                    {
                        "title": "Data Structures and Algorithms Full Course 📈",
                        "youtubeVideoId": "CBYHwZcbD-s",
                        "durationSeconds": 14415
                    },
                    {
                        "title": "Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges",
                        "youtubeVideoId": "oBt53YbR9Kk",
                        "durationSeconds": 18602
                    }
                ]
            },
            {
                "title": "Section 3 - Data Part 3",
                "videos": [
                    {
                        "title": "Big O Notation - Full Course",
                        "youtubeVideoId": "Mo4vesaut8g",
                        "durationSeconds": 6976
                    },
                    {
                        "title": "Free Data Structures and Algorithms Course ~35 Hours | #DSA #faang",
                        "youtubeVideoId": "glHV1QZ8e70",
                        "durationSeconds": 710
                    },
                    {
                        "title": "Algorithms Course - Graph Theory Tutorial from a Google Engineer",
                        "youtubeVideoId": "09_LlHjoEiY",
                        "durationSeconds": 24280
                    },
                    {
                        "title": "Binary Tree Algorithms for Technical Interviews - Full Course",
                        "youtubeVideoId": "fAAZixBzIAI",
                        "durationSeconds": 6533
                    },
                    {
                        "title": "Data Structures - Computer Science Course for Beginners",
                        "youtubeVideoId": "zg9ih6SVACc",
                        "durationSeconds": 10766
                    }
                ]
            }
        ]
    },
    {
        "title": "JavaScript – From Zero to Advanced",
        "slug": "javascript-zero-to-advanced",
        "description": "Complete JavaScript course covering ES6+.",
        "thumbnailUrl": "https://i.ytimg.com/vi/PkZNo7MFNFg/hq720.jpg",
        "price": 1299,
        "level": "BEGINNER",
        "tags": "javascript,webdev,frontend,es6",
        "isFeatured": true,
        "trailerUrl": "PkZNo7MFNFg",
        "sections": [
            {
                "title": "Section 1 - JavaScript Part 1",
                "videos": [
                    {
                        "title": "Learn JavaScript - Full Course for Beginners",
                        "youtubeVideoId": "PkZNo7MFNFg",
                        "durationSeconds": 12403
                    },
                    {
                        "title": "JavaScript Programming - Full Course",
                        "youtubeVideoId": "jS4aFq5-91M",
                        "durationSeconds": 27860
                    },
                    {
                        "title": "JavaScript DOM Manipulation – Full Course for Beginners",
                        "youtubeVideoId": "5fb2aPlgoys",
                        "durationSeconds": 9681
                    },
                    {
                        "title": "JavaScript Interview Prep: Functions, Closures, Currying",
                        "youtubeVideoId": "tbqVqP5ilzQ",
                        "durationSeconds": 5343
                    },
                    {
                        "title": "JavaScript Course for Beginners",
                        "youtubeVideoId": "Zi-Q0t4gMC8",
                        "durationSeconds": 12938
                    }
                ]
            },
            {
                "title": "Section 2 - JavaScript Part 2",
                "videos": [
                    {
                        "title": "JavaScript Functions Crash Course",
                        "youtubeVideoId": "j1laALb8OVM",
                        "durationSeconds": 5814
                    },
                    {
                        "title": "Everything You Need to Know About JavaScript Arrays – Full Course",
                        "youtubeVideoId": "gl0cpq4RJhU",
                        "durationSeconds": 11370
                    },
                    {
                        "title": "What is the JavaScript DOM?",
                        "youtubeVideoId": "c6IyCwAV6BY",
                        "durationSeconds": 7118
                    },
                    {
                        "title": "Asynchronous JavaScript Course (Async/Await, Promises, Callbacks)",
                        "youtubeVideoId": "ZYb_ZU8LNxs",
                        "durationSeconds": 5783
                    },
                    {
                        "title": "JavaScript Course for Beginners – Your First Step to Web Development",
                        "youtubeVideoId": "W6NZfCO5SIk",
                        "durationSeconds": 2897
                    }
                ]
            },
            {
                "title": "Section 3 - JavaScript Part 3",
                "videos": [
                    {
                        "title": "JavaScript Classes Tutorial",
                        "youtubeVideoId": "2ZphE5HcQPQ",
                        "durationSeconds": 3689
                    },
                    {
                        "title": "JavaScript Essentials Course – Foundational JS Skills for New Developers Tutorial",
                        "youtubeVideoId": "876aSEUA_8c",
                        "durationSeconds": 34311
                    },
                    {
                        "title": "JavaScript Tutorial Full Course - Beginner to Pro",
                        "youtubeVideoId": "EerdGm-ehJQ",
                        "durationSeconds": 80157
                    },
                    {
                        "title": "Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)",
                        "youtubeVideoId": "zJSY8tbf_ys",
                        "durationSeconds": 76482
                    },
                    {
                        "title": "How to Learn JavaScript FAST in 2026",
                        "youtubeVideoId": "xB3ZmUH6GqU",
                        "durationSeconds": 752
                    }
                ]
            }
        ]
    },
    {
        "title": "React.js – Complete Developer Course",
        "slug": "react-complete-developer",
        "description": "Build modern web apps with React.",
        "thumbnailUrl": "https://i.ytimg.com/vi/RVFAyFWO4go/hq720.jpg",
        "price": 1799,
        "level": "INTERMEDIATE",
        "tags": "react,frontend,hooks,webdev",
        "isFeatured": true,
        "trailerUrl": "RVFAyFWO4go",
        "sections": [
            {
                "title": "Section 1 - React.js Part 1",
                "videos": [
                    {
                        "title": "React JS Full Course for Beginners | Complete All-in-One Tutorial | 9 Hours",
                        "youtubeVideoId": "RVFAyFWO4go",
                        "durationSeconds": 31746
                    },
                    {
                        "title": "TypeScript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
                        "youtubeVideoId": "gieEQFIfgYc",
                        "durationSeconds": 30117
                    },
                    {
                        "title": "React Redux Full Course for Beginners | Redux Toolkit Complete Tutorial",
                        "youtubeVideoId": "NqzdVN2tyvQ",
                        "durationSeconds": 14379
                    },
                    {
                        "title": "JavaScript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
                        "youtubeVideoId": "EfAl9bwzVZk",
                        "durationSeconds": 28473
                    },
                    {
                        "title": "React Tutorial Full Course - Beginner to Pro (React 19, 2025)",
                        "youtubeVideoId": "TtPXvEcE11E",
                        "durationSeconds": 41524
                    }
                ]
            },
            {
                "title": "Section 2 - React.js Part 2",
                "videos": [
                    {
                        "title": "React Native Full Course for Beginners | Complete All-in-One Tutorial | 4 Hours",
                        "youtubeVideoId": "WDunoPNBxKA",
                        "durationSeconds": 15928
                    },
                    {
                        "title": "React Typescript Tutorial for Beginners",
                        "youtubeVideoId": "xTVQZ46wc28",
                        "durationSeconds": 1704
                    },
                    {
                        "title": "MERN Stack Full Tutorial & Project | Complete All-in-One Course | 8 Hours",
                        "youtubeVideoId": "CvCiNeLnZ00",
                        "durationSeconds": 28256
                    },
                    {
                        "title": "React JS Lists and Keys | Learn ReactJS",
                        "youtubeVideoId": "Fcj6DQT3nVA",
                        "durationSeconds": 1974
                    },
                    {
                        "title": "Introduction to React JS | ReactJS Setup and Resources",
                        "youtubeVideoId": "TeeAp5zkYnI",
                        "durationSeconds": 804
                    }
                ]
            },
            {
                "title": "Section 3 - React.js Part 3",
                "videos": [
                    {
                        "title": "Learn React Router with a Beginners Project | Learn React JS",
                        "youtubeVideoId": "Cv_JhlKUpto",
                        "durationSeconds": 1214
                    }
                ]
            }
        ]
    },
    {
        "title": "Node.js & Express – Backend Development",
        "slug": "nodejs-express-backend",
        "description": "Build scalable REST APIs with Node.js and Express.",
        "thumbnailUrl": "https://i.ytimg.com/vi/KOutPbKc9UM/hq720.jpg",
        "price": 1499,
        "level": "INTERMEDIATE",
        "tags": "nodejs,express,backend",
        "isFeatured": true,
        "trailerUrl": "KOutPbKc9UM",
        "sections": [
            {
                "title": "Section 1 - Node.js Part 1",
                "videos": [
                    {
                        "title": "Intro to Backend Web Development – Node.js & Express Tutorial for Beginners",
                        "youtubeVideoId": "KOutPbKc9UM",
                        "durationSeconds": 8782
                    },
                    {
                        "title": "Node.js and Express.js - Full Course",
                        "youtubeVideoId": "Oe421EPjeBE",
                        "durationSeconds": 29808
                    },
                    {
                        "title": "Node.js / Express Course - Build 4 Projects",
                        "youtubeVideoId": "qwfE7fSVaZM",
                        "durationSeconds": 36008
                    },
                    {
                        "title": "CRUD API Tutorial – Node, Express, MongoDB",
                        "youtubeVideoId": "_7UQPve99r4",
                        "durationSeconds": 5594
                    },
                    {
                        "title": "Express.js & Node.js Course for Beginners - Full Tutorial",
                        "youtubeVideoId": "G8uL0lFFoN0",
                        "durationSeconds": 8894
                    }
                ]
            },
            {
                "title": "Section 2 - Node.js Part 2",
                "videos": [
                    {
                        "title": "Learn Docker - DevOps with Node.js & Express",
                        "youtubeVideoId": "9zUHg7xjIqQ",
                        "durationSeconds": 19320
                    },
                    {
                        "title": "Learn Node.js - Full Tutorial for Beginners",
                        "youtubeVideoId": "RLtyhwFtXQA",
                        "durationSeconds": 10124
                    },
                    {
                        "title": "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
                        "youtubeVideoId": "TlB_eWDSMt4",
                        "durationSeconds": 4696
                    },
                    {
                        "title": "Node.js Crash Course",
                        "youtubeVideoId": "32M1al-Y6Ag",
                        "durationSeconds": 7595
                    },
                    {
                        "title": "Learn Express JS In 35 Minutes",
                        "youtubeVideoId": "SccSCuHhOw0",
                        "durationSeconds": 2163
                    }
                ]
            },
            {
                "title": "Section 3 - Node.js Part 3",
                "videos": [
                    {
                        "title": "PERN Stack Course - Postgres, Express, React, and Node",
                        "youtubeVideoId": "ldYcgPKEZC8",
                        "durationSeconds": 4965
                    },
                    {
                        "title": "Express Crash Course",
                        "youtubeVideoId": "CnH3kAXSrmU",
                        "durationSeconds": 6371
                    },
                    {
                        "title": "Backend Complete Course | NodeJS, ExpressJS, JWT, PostgreSQL, Prisma...",
                        "youtubeVideoId": "g09PoiCob4Y",
                        "durationSeconds": 10957
                    },
                    {
                        "title": "User Authentication in Web Apps (Passport.js, Node, Express)",
                        "youtubeVideoId": "F-sFp_AvHc8",
                        "durationSeconds": 22409
                    },
                    {
                        "title": "Become a Fullstack Developer from Scratch – Full Beginner’s Tutorial",
                        "youtubeVideoId": "LzMnsfqjzkA",
                        "durationSeconds": 170961
                    }
                ]
            }
        ]
    },
    {
        "title": "Database Design & SQL – Complete Course",
        "slug": "database-sql-complete",
        "description": "Master relational database SQL queries.",
        "thumbnailUrl": "https://i.ytimg.com/vi/HXV3zeQKqGY/hq720.jpg",
        "price": 999,
        "level": "BEGINNER",
        "tags": "sql,database,mysql",
        "isFeatured": true,
        "trailerUrl": "HXV3zeQKqGY",
        "sections": [
            {
                "title": "Section 1 - Database Part 1",
                "videos": [
                    {
                        "title": "SQL Tutorial - Full Database Course for Beginners",
                        "youtubeVideoId": "HXV3zeQKqGY",
                        "durationSeconds": 15639
                    },
                    {
                        "title": "Harvard CS50’s Intro to Databases with SQL – Full University Course",
                        "youtubeVideoId": "WXk7yDqsKxs",
                        "durationSeconds": 40129
                    },
                    {
                        "title": "SQL Tutorial for Beginners (and Technical Interview Questions Solved)",
                        "youtubeVideoId": "-fW2X7fh7Yg",
                        "durationSeconds": 19539
                    },
                    {
                        "title": "SQL Server Performance Essentials – Full Course",
                        "youtubeVideoId": "HvxmF0FUwrM",
                        "durationSeconds": 14607
                    },
                    {
                        "title": "SQL Course for Beginners [Full Course]",
                        "youtubeVideoId": "7S_tz1z_5bA",
                        "durationSeconds": 11419
                    }
                ]
            },
            {
                "title": "Section 2 - Database Part 2",
                "videos": [
                    {
                        "title": "SQL Full Course for free 🐬",
                        "youtubeVideoId": "5OdVJbNCSso",
                        "durationSeconds": 10800
                    },
                    {
                        "title": "Intuitive SQL For Data Analytics - Tutorial",
                        "youtubeVideoId": "mXW7JHJM34k",
                        "durationSeconds": 39616
                    },
                    {
                        "title": "Learn SQL Beginner to Advanced in Under 4 Hours",
                        "youtubeVideoId": "OT1RErkfLNQ",
                        "durationSeconds": 14698
                    },
                    {
                        "title": "SQL For Web Developers - Complete Database Course",
                        "youtubeVideoId": "KBDSJU3cGkc",
                        "durationSeconds": 17083
                    },
                    {
                        "title": "SQL - Complete Course in 3 Hours | SQL One Shot using MySQL",
                        "youtubeVideoId": "hlGoQC332VM",
                        "durationSeconds": 11774
                    }
                ]
            },
            {
                "title": "Section 3 - Database Part 3",
                "videos": [
                    {
                        "title": "SQL Tutorial for Beginners (Complete Course using MySQL)",
                        "youtubeVideoId": "yE6tIle64tU",
                        "durationSeconds": 14274
                    },
                    {
                        "title": "SQL Full Course for Beginners (30 Hours) – From Zero to Hero",
                        "youtubeVideoId": "SSKVgrwhzus",
                        "durationSeconds": 107308
                    },
                    {
                        "title": "Learn PostgreSQL Tutorial - Full Course for Beginners",
                        "youtubeVideoId": "qw--VYLpxG4",
                        "durationSeconds": 15574
                    },
                    {
                        "title": "MySQL Database - Full Course",
                        "youtubeVideoId": "ER8oKX5myE0",
                        "durationSeconds": 7171
                    },
                    {
                        "title": "Databases In-Depth – Complete Course",
                        "youtubeVideoId": "pPqazMTzNOM",
                        "durationSeconds": 13280
                    }
                ]
            }
        ]
    },
    {
        "title": "Operating Systems – CS Core",
        "slug": "operating-systems-cs-core",
        "description": "Deep dive into OS concepts.",
        "thumbnailUrl": "https://i.ytimg.com/vi/vBURTt97EkA/hq720.jpg",
        "price": 1199,
        "level": "INTERMEDIATE",
        "tags": "os,operating-systems",
        "isFeatured": true,
        "trailerUrl": "vBURTt97EkA",
        "sections": [
            {
                "title": "Section 1 - Operating Part 1",
                "videos": [
                    {
                        "title": "Introduction to Operating Systems",
                        "youtubeVideoId": "vBURTt97EkA",
                        "durationSeconds": 1005
                    },
                    {
                        "title": "Operating System Structure",
                        "youtubeVideoId": "fvN98a_7AT4",
                        "durationSeconds": 737
                    },
                    {
                        "title": "Structures of Operating System",
                        "youtubeVideoId": "XXPBl20J22w",
                        "durationSeconds": 1167
                    },
                    {
                        "title": "Introduction to CPU Scheduling",
                        "youtubeVideoId": "EWkQl0n0w5M",
                        "durationSeconds": 614
                    },
                    {
                        "title": "Basics of OS (Computer System Operation)",
                        "youtubeVideoId": "VjPgYcQqqN0",
                        "durationSeconds": 1089
                    }
                ]
            },
            {
                "title": "Section 2 - Operating Part 2",
                "videos": [
                    {
                        "title": "Process Management (Processes and Threads)",
                        "youtubeVideoId": "OrM7nZcxXZU",
                        "durationSeconds": 452
                    },
                    {
                        "title": "System Calls",
                        "youtubeVideoId": "lhToWeuWWfw",
                        "durationSeconds": 759
                    },
                    {
                        "title": "Operating System Services",
                        "youtubeVideoId": "TQWERtMoKbI",
                        "durationSeconds": 797
                    },
                    {
                        "title": "Process Control Block",
                        "youtubeVideoId": "4s2MKuVYKV8",
                        "durationSeconds": 422
                    },
                    {
                        "title": "Operating System Design & Implementation",
                        "youtubeVideoId": "t_McsJ1RGQg",
                        "durationSeconds": 796
                    }
                ]
            }
        ]
    },
    {
        "title": "System Design – Interview Masterclass",
        "slug": "system-design-interview",
        "description": "Ace system design interviews.",
        "thumbnailUrl": "https://i.ytimg.com/vi/F2FmTdLtb_4/hq720.jpg",
        "price": 1999,
        "level": "ADVANCED",
        "tags": "system-design,architecture",
        "isFeatured": true,
        "trailerUrl": "F2FmTdLtb_4",
        "sections": [
            {
                "title": "Section 1 - System Part 1",
                "videos": [
                    {
                        "title": "System Design Concepts Course and Interview Prep",
                        "youtubeVideoId": "F2FmTdLtb_4",
                        "durationSeconds": 3218
                    },
                    {
                        "title": "System Design for Beginners Course",
                        "youtubeVideoId": "m8Icp_Cid5o",
                        "durationSeconds": 5107
                    },
                    {
                        "title": "Microservice Architecture and System Design with Python & Kubernetes – Full Course",
                        "youtubeVideoId": "hmkF77F9TLw",
                        "durationSeconds": 18251
                    },
                    {
                        "title": "How I Mastered System Design Interviews",
                        "youtubeVideoId": "l3X1t3kpmwY",
                        "durationSeconds": 622
                    },
                    {
                        "title": "System Design Interview: A Step-By-Step Guide",
                        "youtubeVideoId": "i7twT3x5yv8",
                        "durationSeconds": 594
                    }
                ]
            },
            {
                "title": "Section 2 - System Part 2",
                "videos": [
                    {
                        "title": "20 System Design Concepts Explained in 10 Minutes",
                        "youtubeVideoId": "i53Gi_K3o7I",
                        "durationSeconds": 701
                    },
                    {
                        "title": "System Design Interview Question: Design Spotify",
                        "youtubeVideoId": "OYtYc98XBZw",
                        "durationSeconds": 347
                    },
                    {
                        "title": "System Design was HARD until I Learned these 30 Concepts",
                        "youtubeVideoId": "s9Qh9fWeOAk",
                        "durationSeconds": 1244
                    },
                    {
                        "title": "Data Structures and Algorithms Mega Course – Master Technical Interviews in 49 Hours",
                        "youtubeVideoId": "xwI5OBEnsZU",
                        "durationSeconds": 175820
                    },
                    {
                        "title": "How to Answer System Design Interview Questions (Complete Guide)",
                        "youtubeVideoId": "L9TfZdODuFQ",
                        "durationSeconds": 430
                    }
                ]
            },
            {
                "title": "Section 3 - System Part 3",
                "videos": [
                    {
                        "title": "Software Engineering Job Interview – Full Mock Interview",
                        "youtubeVideoId": "1qw5ITr3k9E",
                        "durationSeconds": 4469
                    },
                    {
                        "title": "8 Most Important System Design Concepts You Should Know",
                        "youtubeVideoId": "BTjxUS_PylA",
                        "durationSeconds": 365
                    },
                    {
                        "title": "I spent 1000+ hours on System Design, so you don't have to.",
                        "youtubeVideoId": "jc285TeGKAE",
                        "durationSeconds": 1087
                    },
                    {
                        "title": "Master Design Patterns & SOLID Principles in C# - Full OOP Course for Beginners",
                        "youtubeVideoId": "rylaiB2uH2A",
                        "durationSeconds": 42414
                    }
                ]
            }
        ]
    }
];

async function main() {
    console.log('🌱 Seeding database with Real Top YouTube Dynamic Results...');

    await prisma.videoProgress.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.video.deleteMany();
    await prisma.section.deleteMany();
    await prisma.subject.deleteMany();

    for (const course of courses) {
        const { sections, ...courseData } = course;

        const subject = await prisma.subject.create({
            data: {
                ...courseData,
                isPublished: true,
                sections: {
                    create: sections.map((section, sectionIdx) => ({
                        title: section.title,
                        orderIndex: sectionIdx,
                        videos: {
                            create: section.videos.map((video, videoIdx) => ({
                                title: String(video.title).substring(0, 190), 
                                youtubeVideoId: video.youtubeVideoId,
                                durationSeconds: video.durationSeconds || 300,
                                orderIndex: videoIdx,
                                isFreePreview: videoIdx === 0,
                            }))
                        }
                    }))
                }
            }
        });

        console.log(`✅ ${subject.title} created with ${sections.length} sections.`);
    }

    console.log('🎉 Seeding complete!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
