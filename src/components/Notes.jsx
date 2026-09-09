import React from 'react';
import { Flower2, Leaf, Sparkles, Sun, TreePine, Coffee } from 'lucide-react';

const Notes = () => {
    const fragranceCategories = [
        {
            id: 1,
            name: 'Floral',
            icon: Flower2,
            color: 'from-pink-500 to-rose-500',
            description: 'Delicate and romantic scents featuring flower essences',
            notes: ['Rose', 'Jasmine', 'Lily', 'Peony', 'Tuberose', 'Iris'],
            characteristics: 'Feminine, romantic, soft, and elegant'
        },
        {
            id: 2,
            name: 'Fresh',
            icon: Leaf,
            color: 'from-green-500 to-teal-500',
            description: 'Clean, crisp, and invigorating scents',
            notes: ['Citrus', 'Bergamot', 'Lemon', 'Marine', 'Green Tea', 'Mint'],
            characteristics: 'Energizing, clean, uplifting, and modern'
        },
        {
            id: 3,
            name: 'Oriental',
            icon: Sparkles,
            color: 'from-amber-500 to-orange-500',
            description: 'Rich, warm, and exotic with spicy undertones',
            notes: ['Amber', 'Vanilla', 'Incense', 'Cinnamon', 'Cardamom', 'Saffron'],
            characteristics: 'Mysterious, sensual, warm, and sophisticated'
        },
        {
            id: 4,
            name: 'Citrus',
            icon: Sun,
            color: 'from-yellow-500 to-orange-400',
            description: 'Bright, zesty, and refreshing fruit-based scents',
            notes: ['Lemon', 'Orange', 'Grapefruit', 'Lime', 'Mandarin', 'Yuzu'],
            characteristics: 'Energetic, fresh, bright, and cheerful'
        },
        {
            id: 5,
            name: 'Woody',
            icon: TreePine,
            color: 'from-amber-600 to-brown-500',
            description: 'Warm, dry, and earthy with wood-based notes',
            notes: ['Sandalwood', 'Cedar', 'Rosewood', 'Vetiver', 'Patchouli', 'Oud'],
            characteristics: 'Grounding, sophisticated, natural, and timeless'
        },
        {
            id: 6,
            name: 'Gourmand',
            icon: Coffee,
            color: 'from-purple-500 to-pink-500',
            description: 'Sweet, edible scents that evoke food and desserts',
            notes: ['Vanilla', 'Chocolate', 'Caramel', 'Coffee', 'Honey', 'Almond'],
            characteristics: 'Comforting, sweet, indulgent, and cozy'
        }
    ];

    const topNotes = [
        { name: 'Bergamot', description: 'Fresh, citrusy, and slightly spicy' },
        { name: 'Lemon', description: 'Bright, zesty, and energizing' },
        { name: 'Rose', description: 'Classic, romantic, and feminine' },
        { name: 'Lavender', description: 'Calming, clean, and herbal' },
    ];

    const middleNotes = [
        { name: 'Jasmine', description: 'Intoxicating, sweet, and floral' },
        { name: 'Geranium', description: 'Green, rosy, and slightly minty' },
        { name: 'Ylang-ylang', description: 'Exotic, creamy, and tropical' },
        { name: 'Cinnamon', description: 'Warm, spicy, and comforting' },
    ];

    const baseNotes = [
        { name: 'Sandalwood', description: 'Creamy, warm, and woody' },
        { name: 'Vanilla', description: 'Sweet, comforting, and gourmand' },
        { name: 'Musk', description: 'Sensual, clean, and animalic' },
        { name: 'Amber', description: 'Warm, resinous, and rich' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Understanding Fragrance Notes
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover the art of perfumery through fragrance families, notes, and the science behind scent composition
                </p>
            </div>

            {/* Fragrance Categories */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fragrance Families</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fragranceCategories.map(category => {
                        const Icon = category.icon;
                        return (
                            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                    <Icon className="w-12 h-12 text-white" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                                    <p className="text-gray-600 mb-4">{category.description}</p>
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Common Notes:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {category.notes.map(note => (
                                                <span key={note} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Characteristics:</h4>
                                        <p className="text-gray-600 text-sm">{category.characteristics}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fragrance Pyramid */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Fragrance Pyramid</h2>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-600">
                            Every perfume is composed of three layers of notes that unfold over time
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Top Notes */}
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-lg">TOP</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Notes</h3>
                            <p className="text-gray-600 mb-6">The initial impression, lasting 15-30 minutes</p>
                            <div className="space-y-3">
                                {topNotes.map(note => (
                                    <div key={note.name} className="bg-yellow-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-gray-900">{note.name}</h4>
                                        <p className="text-sm text-gray-600">{note.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Middle Notes */}
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-lg">HEART</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Heart Notes</h3>
                            <p className="text-gray-600 mb-6">The main body, lasting 2-4 hours</p>
                            <div className="space-y-3">
                                {middleNotes.map(note => (
                                    <div key={note.name} className="bg-purple-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-gray-900">{note.name}</h4>
                                        <p className="text-sm text-gray-600">{note.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Base Notes */}
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-brown-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white font-bold text-lg">BASE</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Base Notes</h3>
                            <p className="text-gray-600 mb-6">The foundation, lasting 6+ hours</p>
                            <div className="space-y-3">
                                {baseNotes.map(note => (
                                    <div key={note.name} className="bg-amber-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-gray-900">{note.name}</h4>
                                        <p className="text-sm text-gray-600">{note.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Pro Tips for Fragrance Lovers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Test Perfumes</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Test on clean skin, not on paper strips</li>
                            <li>• Wait 30 minutes to smell the heart notes</li>
                            <li>• Test only 2-3 fragrances at once</li>
                            <li>• Don't rub your wrists together</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Application Tips</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Apply to pulse points (wrists, neck, behind ears)</li>
                            <li>• Spray from 6 inches away</li>
                            <li>• Layer with matching body products</li>
                            <li>• Store in cool, dark places</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;