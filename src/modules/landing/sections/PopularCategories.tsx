import React from 'react';
import { Box } from '@mui/material';
import CategoryButton from '@modules/landing/components/CategoryButton';

const CATEGORIES = ['Music', 'Tech', 'Food & Drink', 'Arts', 'Business', 'Sports'];

const PopularCategories = () => {
  return (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {CATEGORIES.map((category) => (
          <CategoryButton key={category} category={category} />
        ))}
      </Box>
    </Box>
  );
};

export default PopularCategories;