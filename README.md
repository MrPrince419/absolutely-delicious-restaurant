# Absolutely Delicious Restaurant Website

A modern, responsive website for Absolutely Delicious restaurant in Sault Ste Marie, Ontario. Features a clean design with tabbed menu navigation, interactive Google Maps integration, and mobile-first responsive design.

## 🍽️ About

Absolutely Delicious is a local restaurant specializing in homemade comfort food, serving breakfast and lunch daily. This website showcases their menu, location, hours, and provides easy contact options for customers.

## ✨ Features

- **Modern Tabbed Menu System** - Interactive menu navigation with smooth transitions
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Interactive Google Maps** - Embedded map showing restaurant location
- **One-Click Calling** - Direct phone links for easy ordering
- **Clean Typography** - Using DM Sans font for excellent readability
- **Accessibility Focused** - ARIA labels and keyboard navigation support
- **Fast Loading** - Optimized images and efficient CSS/JS

## 🚀 Live Demo

Visit the live website: [Absolutely Delicious Restaurant](https://absolutely-delicious-restaurant.netlify.app)

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - Interactive functionality
- **Google Fonts** - DM Sans typography
- **Google Maps Embed** - Location integration

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🎨 Design Features

### Menu System
- Tabbed navigation (Breakfast & Lunch, Daily Specials, Desserts, Frozen Meals)
- Default shows Breakfast & Lunch menu
- Smooth fade-in animations
- Keyboard navigation support

### Interactive Elements
- Clickable logo returns to hero section
- Hover effects on cards and buttons
- Mobile-friendly touch interactions
- Phone number links for direct calling

### Typography & Colors
- **Primary Font**: DM Sans
- **Primary Color**: Teal (#218090)
- **Background**: Cream tones for warmth
- **High contrast** for accessibility

## 📞 Restaurant Information

- **Name**: Absolutely Delicious
- **Address**: 96 Great Northern Rd, Sault Ste Marie, ON
- **Phone**: (705) 256-8804
- **Hours**: 
  - Monday: CLOSED
  - Tuesday-Saturday: 9:00 AM - 4:00 PM
  - Sunday: 9:00 AM - 2:00 PM

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `# No build command needed for static site`
3. Set publish directory: `./` (root directory)
4. Deploy!

### Manual Deployment
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure server to serve static files

## 📁 Project Structure

```
absolutely-delicious-restaurant/
├── index.html              # Main HTML file
├── style.css              # Styles and responsive design
├── app.js                 # JavaScript functionality
├── menu_images_overview.png # Menu preview image
├── restaurant_menu_data.json # Menu data (for future use)
├── README.md              # Project documentation
├── .gitignore            # Git ignore file
└── netlify.toml          # Netlify configuration
```

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/MrPrince419/absolutely-delicious-restaurant.git
   ```

2. Navigate to project directory:
   ```bash
   cd absolutely-delicious-restaurant
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for Absolutely Delicious Restaurant. All rights reserved.

## 📞 Contact

For website issues or updates, please contact the restaurant directly at (705) 256-8804.

---

**Built with ❤️ for Absolutely Delicious Restaurant**