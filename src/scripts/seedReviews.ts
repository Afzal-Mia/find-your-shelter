import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Review } from '../models/Review';
import { Property } from '../models/property';

// Load environment variables (try .env.local first, then .env)
dotenv.config({ path: '.env.local' });
dotenv.config();

const seedReviews = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find at least one property to attach the reviews to
    const property = await Property.findOne();
    if (!property) {
      console.log('No properties found in the database. Please create a property first.');
      process.exit(1);
    }

    const reviews = [];
    const statuses = ['pending', 'approved', 'rejected'] as const;

    console.log(`Generating 50 reviews for property: ${property.title}...`);

    for (let i = 1; i <= 50; i++) {
      reviews.push({
        propertyId: property._id,
        name: `Test User ${i}`,
        email: `user${i}@example.com`,
        rating: Math.floor(Math.random() * 5) + 1, // random rating 1 to 5
        comment: `This is an automated seeded review number ${i}. The experience was ${Math.random() > 0.5 ? 'excellent' : 'okay'}.`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }

    // Insert into DB
    await Review.insertMany(reviews);
    console.log('Successfully seeded 50 reviews!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding reviews:', error);
    process.exit(1);
  }
};

seedReviews();
