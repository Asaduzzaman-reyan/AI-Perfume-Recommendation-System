import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Heart } from 'lucide-react';

const Blog = () => {
    const featuredPost = {
        id: 1,
        title: 'The Art of Layering Fragrances: A Complete Guide',
        excerpt: 'Master the sophisticated technique of fragrance layering to create your own unique scent signature that reflects your personality.',
        author: 'MD.Asaduzzaman Reyan',
        date: '2024-01-15',
        readTime: '8 min read',
        category: 'Technique',
        image: 'https://images.unsplash.com/photo-1716903073167-0e2e2c58e445?auto=format&fit=crop&w=800&q=80',
        featured: true,
        content: `**Full Article:**  
Layering fragrances is a sophisticated technique that allows you to create a scent that is uniquely yours. Rather than relying on a single perfume, layering involves combining two or more fragrances to craft a personalized aroma that reflects your mood, personality, or even the occasion. This art form has been practiced for centuries in the Middle East and is now gaining popularity worldwide among fragrance enthusiasts.

![Perfume Bottles](https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80)

![Woman holding perfume](https://images.unsplash.com/photo-1716903073167-0e2e2c58e445?auto=format&fit=crop&w=600&q=80)

### Why Layer Fragrances?

Layering offers several benefits:
- **Personalization:** You can create a signature scent that no one else has.
- **Versatility:** Adjust your fragrance to suit different seasons, events, or times of day.
- **Depth and Longevity:** Layering can add complexity and help your scent last longer.

### How to Start Layering

1. **Begin with Clean Skin:**  
   Always start with freshly showered skin. Unscented moisturizers can help lock in fragrance and provide a base for layering.

2. **Choose Your Scents:**  
   Select perfumes that share complementary notes. For beginners, stick to two fragrances. Common combinations include:
   - Floral + Citrus (for freshness)
   - Woody + Spicy (for warmth)
   - Gourmand + Vanilla (for sweetness)
   - Musk + Anything (for depth)

3. **Apply in the Right Order:**  
   Start with the heavier, richer scent as your base, then add the lighter fragrance on top. This helps the lighter notes shine while the base provides longevity.

4. **Spray Strategically:**  
   You can spray both scents on the same pulse points (wrists, neck, behind ears) or layer them on different parts of your body for a more subtle blend.

5. **Experiment and Adjust:**  
   Don’t be afraid to try different combinations. Sometimes, unexpected pairings create the most memorable results.

### Pro Tips for Successful Layering

- **Test Before You Commit:**  
  Try layering on a small patch of skin before applying all over.
- **Stick to the Same Family:**  
  If you’re unsure, layer scents from the same fragrance family (e.g., all florals or all orientals).
- **Use Unscented Products:**  
  Start with unscented lotions or oils to avoid clashing with your chosen perfumes.
- **Less is More:**  
  Don’t overdo it. Two to three sprays of each fragrance are usually enough.

### Layering with Other Products

You can also layer by using matching or complementary scented body washes, lotions, and hair mists. Many brands offer fragrance lines with multiple products designed for layering.

### Common Mistakes to Avoid

- **Mixing Too Many Scents:**  
  Stick to two or three fragrances to avoid an overwhelming result.
- **Ignoring Seasonality:**  
  Heavy, spicy scents may be too much for summer, while light florals might not last in winter.
- **Not Considering Your Environment:**  
  Some environments (like the office) call for subtlety, while evenings out allow for bolder combinations.

### Final Thoughts

The art of layering fragrances is all about creativity and self-expression. There are no strict rules—just guidelines to help you discover what works best for you. With a little experimentation, you’ll find combinations that make you feel confident, unique, and unforgettable.

**Ready to create your signature scent? Start layering and let your fragrance tell your story!**
`
    };

    const blogPosts = [
        {
            id: 2,
            title: 'Top 10 Sustainable Perfume Brands to Watch in 2024',
            excerpt: 'Discover eco-friendly fragrance houses leading the way in sustainable luxury perfumery.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-12',
            readTime: '6 min read',
            category: 'Sustainability',
            image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
Sustainability in perfumery is more important than ever. Here are 10 brands making a difference...`
        },
        {
            id: 3,
            title: 'Fragrance Chemistry: Understanding How Perfumes Work',
            excerpt: 'Dive deep into the science behind how fragrances interact with your skin and environment.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-10',
            readTime: '10 min read',
            category: 'Science',
            image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
The chemistry of fragrance is fascinating. Perfumes are made up of volatile compounds that evaporate quickly, allowing us to smell them. The science of scent involves understanding these compounds and how they interact with our olfactory receptors...`
        },
        {
            id: 4,
            title: 'Seasonal Scents: Choosing the Perfect Fragrance for Every Season',
            excerpt: 'Learn how to select fragrances that complement the changing seasons and weather.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-08',
            readTime: '5 min read',
            category: 'Lifestyle',
            image: 'https://images.pexels.com/photos/3685532/pexels-photo-3685532.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
Choosing the right fragrance for the season can enhance your overall experience of that time of year. Lighter, fresher scents are often preferred in spring and summer, while warmer, spicier fragrances are popular in fall and winter...`
        },
        {
            id: 5,
            title: 'Vintage Perfumes: A Journey Through Fragrance History',
            excerpt: 'Explore iconic fragrances from past decades and their lasting impact on modern perfumery.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-05',
            readTime: '7 min read',
            category: 'History',
            image: 'https://images.pexels.com/photos/1961796/pexels-photo-1961796.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
Vintage perfumes offer a glimpse into the past and the evolution of fragrance trends. From the classic Chanel No. 5 to the iconic Dior Sauvage, discover the scents that have stood the test of time...`
        },
        {
            id: 6,
            title: 'Building Your Fragrance Wardrobe: Essential Scents for Every Occasion',
            excerpt: 'Create a versatile collection of perfumes suitable for work, play, and special occasions.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-03',
            readTime: '6 min read',
            category: 'Guide',
            image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
A well-rounded fragrance wardrobe includes scents for different occasions and moods. Consider having a fresh, clean scent for work, a romantic floral for evenings out, and a deep, woody fragrance for special occasions...`
        },
        {
            id: 7,
            title: 'The Psychology of Scent: How Fragrance Affects Mood and Memory',
            excerpt: 'Discover the powerful connection between scent, emotions, and psychological well-being.',
            author: 'MD.Asaduzzaman Reyan',
            date: '2024-01-01',
            readTime: '9 min read',
            category: 'Psychology',
            image: 'https://images.pexels.com/photos/3992169/pexels-photo-3992169.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            content: `**Full Article:**  
Scent has a unique ability to evoke memories and influence emotions. This article explores the science behind scent perception and offers insights into how you can use fragrance to enhance your mood and well-being...`
        }
    ];

    const categories = [
        { name: 'All', count: 12 },
        { name: 'Reviews', count: 8 },
        { name: 'Technique', count: 5 },
        { name: 'Sustainability', count: 3 },
        { name: 'Science', count: 4 },
        { name: 'Lifestyle', count: 6 },
        { name: 'History', count: 2 },
    ];

    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!selectedPost ? (
                <>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Fragrance Blog
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the latest trends, expert reviews, and insider knowledge from the world of perfumery
                        </p>
                    </div>

                    {/* Featured Post */}
                    <div className="mb-16">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="lg:flex">
                                <div className="lg:w-1/2">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-64 lg:h-full object-cover"
                                    />
                                </div>
                                <div className="lg:w-1/2 p-8 lg:p-12">
                                    <div className="flex items-center mb-4">
                                        <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                        <span className="ml-3 text-purple-600 font-medium">{featuredPost.category}</span>
                                    </div>

                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center mb-6 text-gray-500 text-sm">
                                        <User className="w-4 h-4 mr-2" />
                                        <span className="mr-4">{featuredPost.author}</span>
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>

                                    <button
                                        className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                                        onClick={() => setSelectedPost(featuredPost)}
                                    >
                                        <span>Read Article</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:flex lg:space-x-12">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blogPosts.map(post => (
                                    <article
                                        key={post.id}
                                        className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-purple-600 font-medium text-sm">{post.category}</span>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between text-gray-500 text-sm">
                                                <div className="flex items-center space-x-4">
                                                    <span className="flex items-center">
                                                        <User className="w-3 h-3 mr-1" />
                                                        {post.author}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3 mt-12 lg:mt-0">
                            {/* Categories */}
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.name}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
                                        >
                                            <span className="text-gray-700 hover:text-purple-600">{category.name}</span>
                                            <span className="text-gray-400 text-sm">({category.count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                                <p className="mb-4 text-purple-100">
                                    Get the latest fragrance news, reviews, and exclusive content delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                                    />
                                    <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Single blog post view
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
                    <button
                        className="mb-4 text-purple-600 hover:underline"
                        onClick={() => setSelectedPost(null)}
                    >
                        ← Back to Blog
                    </button>
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-xl mb-6" />
                    <h2 className="text-3xl font-bold mb-4">{selectedPost.title}</h2>
                    <div className="flex items-center mb-4 text-gray-500 text-sm">
                        <span className="mr-4">{selectedPost.author}</span>
                        <span className="mr-4">{new Date(selectedPost.date).toLocaleDateString()}</span>
                        <span>{selectedPost.readTime}</span>
                    </div>
                    <div className="prose max-w-none whitespace-pre-line">{selectedPost.content}</div>
                </div>
            )}
        </div>
    );
}


export default Blog;