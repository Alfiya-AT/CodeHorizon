const ytSearch = require('yt-search');
const fs = require('fs');

const coursesConfig = [
    {
        title: "100 Days of Code™: The Complete Python Pro Bootcamp",
        slug: "100-days-of-code-python-pro",
        description: "Master Python by building projects.",
        thumbnailUrl: "https://img-b.udemycdn.com/course/750x422/2776760_f176_10.jpg",
        price: 459,
        level: "BEGINNER",
        tags: "python,programming,bootcamp",
        searchQuery: "Python 100 days of code CodeWithHarry"
    },
    {
        title: "C Programming – Complete Course",
        slug: "c-programming-complete",
        description: "Learn C from scratch — variables, loops, pointers.",
        thumbnailUrl: "https://img.youtube.com/vi/KJgsSFOSQv0/maxresdefault.jpg",
        price: 999,
        level: "BEGINNER",
        tags: "c,programming,systems,beginner",
        searchQuery: "C Programming Course Bro Code"
    },
    {
        title: "Data Structures & Algorithms",
        slug: "data-structures-algorithms",
        description: "Master arrays, linked lists, trees, graphs, sorting, searching.",
        thumbnailUrl: "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
        price: 1499,
        level: "INTERMEDIATE",
        tags: "dsa,algorithms,data-structures",
        searchQuery: "Data Structures Algorithms freecodecamp"
    },
    {
        title: "JavaScript – From Zero to Advanced",
        slug: "javascript-zero-to-advanced",
        description: "Complete JavaScript course covering ES6+.",
        thumbnailUrl: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        price: 1299,
        level: "BEGINNER",
        tags: "javascript,webdev,frontend,es6",
        searchQuery: "JavaScript Tutorial freecodecamp"
    },
    {
        title: "React.js – Complete Developer Course",
        slug: "react-complete-developer",
        description: "Build modern web apps with React.",
        thumbnailUrl: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
        price: 1799,
        level: "INTERMEDIATE",
        tags: "react,frontend,hooks,webdev",
        searchQuery: "React JS Tutorial Dave Gray"
    },
    {
        title: "Node.js & Express – Backend Development",
        slug: "nodejs-express-backend",
        description: "Build scalable REST APIs with Node.js and Express.",
        thumbnailUrl: "https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg",
        price: 1499,
        level: "INTERMEDIATE",
        tags: "nodejs,express,backend",
        searchQuery: "Node.js Express freecodecamp"
    },
    {
        title: "Database Design & SQL – Complete Course",
        slug: "database-sql-complete",
        description: "Master relational database SQL queries.",
        thumbnailUrl: "https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
        price: 999,
        level: "BEGINNER",
        tags: "sql,database,mysql",
        searchQuery: "SQL Full Course freecodecamp"
    },
    {
        title: "Operating Systems – CS Core",
        slug: "operating-systems-cs-core",
        description: "Deep dive into OS concepts.",
        thumbnailUrl: "https://img.youtube.com/vi/vBURTt97EkA/maxresdefault.jpg",
        price: 1199,
        level: "INTERMEDIATE",
        tags: "os,operating-systems",
        searchQuery: "Operating Systems Neso Academy"
    },
    {
        title: "System Design – Interview Masterclass",
        slug: "system-design-interview",
        description: "Ace system design interviews.",
        thumbnailUrl: "https://img.youtube.com/vi/UzLMhqg3_Wc/maxresdefault.jpg",
        price: 1999,
        level: "ADVANCED",
        tags: "system-design,architecture",
        searchQuery: "System Design Interview freecodecamp"
    }
];

function chunkArrayForSections(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

// Convert yt-search "HH:MM:SS" or object duration
function getSeconds(timeStr) {
    if (!timeStr) return 300;
    if (typeof timeStr === 'number') return timeStr;
    const parts = timeStr.toString().split(':').map(Number);
    if (parts.length === 3) return parts[0]*3600 + parts[1]*60 + parts[2];
    if (parts.length === 2) return parts[0]*60 + parts[1];
    return parts[0] || 300;
}

async function rebuildSeed() {
    console.log('Fetching Search results via yt-search...');
    const resultCourses = [];

    for (const conf of coursesConfig) {
        console.log(`Searching videos for: ${conf.title}...`);
        try {
            // Option: Instead of trying to find complete playlists, which can be hit-or-miss,
            // we search for top videos on the subject and string together 20 videos into sections.
            // That guarantees we get real, playable, high quality videos for each course!
            const searchResult = await ytSearch(conf.searchQuery);
            
            // Get actual videos from search
            const allVideos = searchResult.videos.slice(0, 15); 
            
            if (allVideos.length === 0) {
                console.warn(`No videos found for ${conf.searchQuery}`);
                continue;
            }

            const baseTrailerUrl = allVideos[0].videoId;

            // Split 15 top videos into 3 sections (5 videos each)
            const sectionChunks = chunkArrayForSections(allVideos, 5);
            
            const sections = sectionChunks.map((chunk, index) => ({
                title: `Section ${index + 1} - ${conf.title.split(' ')[0]} Part ${index + 1}`,
                videos: chunk.map((vid) => ({
                    title: vid.title,
                    youtubeVideoId: vid.videoId,
                    durationSeconds: getSeconds(vid.duration?.seconds || vid.seconds)
                }))
            }));

            resultCourses.push({
                title: conf.title,
                slug: conf.slug,
                description: conf.description,
                thumbnailUrl: allVideos[0].thumbnail || conf.thumbnailUrl, // Use exact yt thumbnail!
                price: conf.price,
                level: conf.level,
                tags: conf.tags,
                isFeatured: true,
                trailerUrl: baseTrailerUrl,
                sections,
            });

        } catch (error) {
            console.error(`Failed to fetch ${conf.title}:`, error);
        }
    }

    const seedFileContent = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courses = ${JSON.stringify(resultCourses, null, 4)};

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

        console.log(\`✅ \${subject.title} created with \${sections.length} sections.\`);
    }

    console.log('🎉 Seeding complete!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
`;

    fs.writeFileSync('prisma/seed.ts', seedFileContent);
    console.log('Saved back to prisma/seed.ts!');
}

rebuildSeed();
