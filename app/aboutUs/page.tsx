'use client';


const AboutPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-16 rounded shadow-2xl w-2/3">
                <h2 className="text-3xl font-semibold text-center mb-4">About Eattrack</h2>
                <p className="text-gray-600 text-lg">
                    This website was built as an exercise for a course in web development.
                    It is a demonstration of modern web development practices, and is not intended
                    for commercial use.
                    This website was built with NEXT.js 13, a React framework.
                    It uses TypeScript, Tailwind CSS, and Prisma.
                    An api was alors built with Node.js and Express.
                </p>
                <p className="text-gray-600 text-lg mt-4">
                    The site was inspired by the minimalist design principles of companies like
                    Apple, Tesla, and Airbnb. We hope you enjoy exploring it!
                </p>
            </div>
        </div>
    )
}

export default AboutPage;
