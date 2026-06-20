# Find Your Shelter - Frontend UI Documentation

> **Project:** Find Your Shelter  
> **Framework:** Next.js 16 (App Router)  
> **UI Library:** shadcn/ui  
> **State Management:** TanStack Query  
> **Notifications:** react-hot-toast  
> **Styling:** Tailwind CSS  
> **Language:** TypeScript

---

# Overview

This document describes the complete UI implementation for the public-facing website.

The website consumes the following public APIs:

- Get Property List (Pagination & Filters)
- Get Property Details
- Submit Inquiry
- Submit Review
- Get Reviews List(no pagination & filters)

The design should be modern, responsive, minimal, and production-ready.

---

# Color Theme

## Primary

Emerald Green

```
#16A34A
```

## Secondary

```
Slate
White
Zinc
```

---

# Layout

Container

```
max-w-7xl mx-auto px-6
```

Section spacing

```
py-24
```

Cards

```
rounded-xl
border
shadow-md
hover:shadow-lg
transition-all
```

Buttons

```
shadcn Button
```

Animations

- Fade In
- Slide Up
- Scale on Hover
- Smooth Transitions

---

# Homepage Structure

```
Navbar

Hero Section


Featured Properties

Why Choose Us

Statistics

Testimonials

Call To Action

Footer
```

---

# Navbar

## Purpose

Provides navigation across the website.

---

## Layout

Left

- Logo
- Project Name

Center

Navigation Links

- Home
- Properties
- About
- Contact

Right

Primary Button

```
Browse Properties
```

---

## Mobile

Use

```
shadcn Sheet
```

Contains

- Home
- Properties
- About
- Contact

---

## Behavior

- Sticky
- Blur background while scrolling
- Shadow appears after scrolling

---

# Hero Section

## Purpose

Introduce the website and encourage users to browse available properties.

---

## Background

- Large Property Image
- Dark Gradient Overlay

---

## Left Content

Small Badge

```
Verified Rental Properties
```

Heading

```
Find Your Dream Home Today
```

Description

```
Browse verified flats, houses, and villas at affordable prices.
```

Buttons

Primary

```
Browse Properties
```

Secondary

```
Contact Us
```

---

## Right Side

Floating Information Card

Display

```
100+

Verified Listings

Trusted Reviews

Affordable Rentals
```

Add floating animation.

---

# Search Section

## Purpose

Allow users to filter available properties.

---

## Card

White

Rounded

Shadow

---

## Fields

Search Input

Placeholder

```
Search properties...
```

Dropdown

```
Property Type
```

Options

- Flat
- House
- Villa

Dropdown

```
Status
```

Options

- Available
- Partially Booked
- Fully Booked

Number Input

Minimum Rent

Number Input

Maximum Rent

Primary Button

```
Search
```

---

## API

```
GET /api/property/get
```

Parameters

- page
- limit
- search
- type
- status
- minRent
- maxRent

---

## UI States

Loading

Use Skeleton Cards

Error

Toast

Empty

Illustration

```
No Properties Found
```

---

# Featured Properties

## Purpose

Display featured properties on the homepage.

---

## API

```
GET /api/property/get?page=1&limit=6
```

---

## Layout

Desktop

```
3 Columns
```

Tablet

```
2 Columns
```

Mobile

```
1 Column
```

---

## Property Card

Image

Property Image

Top Badges

Property Type

Status

Content

Property Title

Location

Monthly Rent

Footer

Primary Button

```
View Details
```

---

## Hover Effect

- Lift Card
- Shadow Increase
- Image Zoom

---

## Click Action

Navigate to

```
/properties/[id]
```

---

# Property Details Page

## Purpose

Display complete property information.

---

## API

```
GET /api/property/:id
```

---

## Layout

Desktop

Two Columns

Left

Large Image

Gallery

Right

Title

Rent

Property Type

Status

Description

Amenities

Property Information

Primary Button

```
Submit Inquiry
```

---

## Additional Sections

Description

Reviews

Related Properties (Optional)

---

# Inquiry Form

## Purpose

Allow users to contact the property owner.

---

## API

```
POST /api/inquiry
```

---

## Fields

Name

Phone

Email

Message

---

## Validation

Use

```
React Hook Form

+

Zod
```

---

## Submit Button

```
Submit Inquiry
```

---

## Success

Show

```
react-hot-toast
```

Message

```
Inquiry Submitted Successfully
```

---

## Error

Display validation messages.

Show toast.

---

## Loading

Disable Button

Show Spinner

---

# Reviews Section

## Purpose

Display existing reviews and allow users to submit a review.

---

## APIs

Display Reviews

```
GET Reviews
```

Submit Review

```
POST Review
```

---

## Review Card

Avatar

Name

Rating

Comment

Date

---

## Review Form

Fields

Name

Email

Rating

Comment

Button

```
Submit Review
```

---

## Success

Toast

Clear Form

---

## Empty State

```
No Reviews Yet
```

---

# Why Choose Us

## Purpose

Highlight platform benefits.

---

## Layout

4 Cards

---

### Card 1

Verified Listings

Description

Verified and trusted rental properties.

---

### Card 2

Affordable Prices

Description

Properties for every budget.

---

### Card 3

Trusted Reviews

Description

Read reviews before making decisions.

---

### Card 4

Easy Inquiry

Description

Contact owners in a single click.

---

# Statistics

## Purpose

Build trust.

---

## Background

Primary Green

---

## Cards

Properties

```
100+
```

Happy Customers

```
500+
```

Cities

```
25+
```

Average Rating

```
4.8★
```

---

## Animation

Use Count Up Animation.

---

# Testimonials

## Purpose

Show customer feedback.

---

## Layout

Carousel

Auto Play

---

## Card

Avatar

Customer Name

Rating

Review

---

# Call To Action

## Purpose

Encourage users to browse available properties.

---

## Background

Primary Green

---

## Heading

```
Ready To Find Your Dream Home?
```

Description

```
Browse verified rental properties today.
```

Buttons

Browse Properties

Contact Us

---

# Footer

## Layout

4 Columns

---

### Column 1

Logo

Short Description

Social Icons

---

### Column 2

Quick Links

- Home
- Properties
- About
- Contact

---

### Column 3

Property Types

- Flat
- House
- Villa

---

### Column 4

Contact

Phone

Email

Location

---

Bottom Bar

```
© 2026 Find Your Shelter

All Rights Reserved.
```

---

# Loading States

Use

```
shadcn Skeleton
```

For

- Property Cards
- Property Details
- Reviews
- Statistics

---

# Empty States

Properties

```
No Properties Found
```

Reviews

```
No Reviews Yet
```

Search

```
No Matching Results
```

---

# Error States

Illustration

Heading

```
Something Went Wrong
```

Button

```
Try Again
```

---

# Toast Notifications

Library

```
react-hot-toast
```

---

## Success Messages

```
Inquiry Submitted Successfully

Review Submitted Successfully
```

---

## Error Messages

```
Failed to Load Properties

Network Error

Validation Failed

Something Went Wrong
```

---

# Pagination

Use API Pagination

Display

Previous Button

Page Numbers

Next Button

Desktop

Centered

Mobile

Compact Pagination

---

# Components

```
components/

Navbar.tsx

Hero.tsx

SearchSection.tsx

FeaturedProperties.tsx

PropertyCard.tsx

PropertyGrid.tsx

PropertyDetails.tsx

InquiryForm.tsx

ReviewForm.tsx

ReviewList.tsx

WhyChooseUs.tsx

Statistics.tsx

Testimonials.tsx

CTASection.tsx

Footer.tsx

Pagination.tsx

LoadingSkeleton.tsx

EmptyState.tsx

ErrorState.tsx
```

---

# React Query

## Query Keys

```
["properties", filters]

["property", id]

["reviews", propertyId]
```

---

## Custom Hooks

```
useProperties()

useProperty(id)

useCreateInquiry()

useCreateReview()
```

---

# Folder Structure

```
app/

page.tsx

properties/

page.tsx

[id]/

page.tsx

components/

features/

property/

review/

inquiry/

hooks/

services/

types/

lib/
```

---

# Responsive Design

Desktop

1440px+

Tablet

768px+

Mobile

375px+

Every section should adapt to all screen sizes.

---

# Accessibility

- Keyboard Navigation
- Proper ARIA Labels
- Focus States
- Semantic HTML
- Accessible Forms

---

# Performance

- Use Next/Image
- Lazy Load Images
- Dynamic Imports where required
- TanStack Query Caching
- Skeleton Loaders
- Image Optimization

---

# Future Enhancements

- Property Wishlist
- Property Comparison
- Google Maps Integration
- Share Property
- Property Image Gallery
- Authentication
- User Dashboard
- Dark Mode Toggle
- Property Sorting
- Recently Viewed Properties
- Related Properties
- Newsletter Subscription

---