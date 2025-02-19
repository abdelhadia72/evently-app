import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ComputerIcon from '@mui/icons-material/Computer';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaletteIcon from '@mui/icons-material/Palette';
import BusinessIcon from '@mui/icons-material/Business';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const categoryColors = {
  music: 'linear-gradient(135deg, #FF6B6B 0%, #FF2D55 100%)',
  tech: 'linear-gradient(135deg, #4F8FFD 0%, #2E5DFF 100%)',
  'food & drink': 'linear-gradient(135deg, #FF9F43 0%, #FF6B2D 100%)',
  arts: 'linear-gradient(135deg, #9B51E0 0%, #6C2EE4 100%)',
  business: 'linear-gradient(135deg, #2ED573 0%, #1ABC9C 100%)',
  sports: 'linear-gradient(135deg, #FF4B4B 0%, #FF2E2E 100%)'
};

interface CategoryButtonProps {
  category: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'music':
      return MusicNoteIcon;
    case 'tech':
      return ComputerIcon;
    case 'food & drink':
      return RestaurantIcon;
    case 'arts':
      return PaletteIcon;
    case 'business':
      return BusinessIcon;
    case 'sports':
      return SportsBasketballIcon;
    default:
      return BusinessIcon;
  }
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  const router = useRouter();
  const IconComponent = getCategoryIcon(category);
  const gradientBg = categoryColors[category.toLowerCase()] || categoryColors.business;

  const handleClick = () => {
    router.push(`/events?category=${category.toLowerCase()}`);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2,
      m: 2 // Add margin for better spacing
    }}>
      <IconButton 
        onClick={handleClick}
        sx={{
          width: 85,
          height: 85,
          borderRadius: '50%',
          background: gradientBg,
          color: 'white',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            '& .category-icon': {
              transform: 'scale(1.15)',
              filter: 'brightness(1.2)',
            }
          },
        }}
      >
        <IconComponent 
          className="category-icon" 
          sx={{ 
            fontSize: 35,
            transition: 'all 0.3s ease',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }} 
        />
      </IconButton>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          color: 'black', // Change text color to black
          fontWeight: 500,
          fontSize: '0.95rem',
          opacity: 0.9,
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 1
          }
        }}
      >
        {category}
      </Typography>
    </Box>
  );
};

export default CategoryButton;